(function() {
  
  /*
   * build attribute like { src: '../logo.png' }
   */
  function buildAttribute(object, propName, value){
    if(value == undefined) return object;
    object = !object ? {} : object; 
    object[propName] = value;
    return object;
  }

  function dropShadowOptions(dropShadow){
    if( dropShadow!==null ){
      let { offset, blurRadius=0, spreadRadius=0, color='black' } = dropShadow
      return `drop-shadow(${offset}px ${blurRadius}px ${spreadRadius}px ${color})`;
    }
    return '';
  }

  function toInt(value){
    return parseInt(value, 10);
  }

  function validatorRange(value){
    let int = toInt(value);
    return int >= 0  && int <= 100;
  }

  function buildImagvue() {

    const props = {
      value:{
        type: String,
        required: true,
      },

      onerror:{
        type: Function,
        default: ()=>{},
      },

      height:{
        type: [String, Number],
        default: 'auto',
      },

      width:{
        type: [String, Number],
        default: 'auto',
      },

      blur:{ //模糊
        type: [String, Number],
        default: '0',
        validator: (value)=> toInt(value) >= 0  
      },

      contrast:{ //對比 0% ~ over 100%
        type: [String, Number],
        default: '100',
        validator: (value)=> toInt(value) >= 0  
      },
      
      brightness:{ //亮度 0% ~ over 100%
        type: [String, Number],
        default: '100',
        validator: (value)=> toInt(value) >= 0  
      },

      grayscale:{ //灰階 0~100
        type: [String, Number],
        default: '0',
        validator: value => validatorRange(value)
      },

      hueRotate:{ //色相旋轉  0~360 deg
        type: [String, Number],
        default: '0',
        validator: (value)=> {
          let int = toInt(value);
          return int >= 0  && int <= 360
        }
      },

      invert:{ //負片效果 0~100%
        type: [String, Number],
        default: '0',
        validator: value => validatorRange(value)
      },

      opacity:{ //透明度 0~100%
        type: [String, Number],
        default: '100',
        validator: value => validatorRange(value)
      },

      saturate:{ //飽和度 0 ~ over 100%
        type: [String, Number],
        default: '100',
        validator: (value)=> toInt(value) >= 0  
      },

      sepia:{ //懷舊 0 ~ 100%
        type: [String, Number],
        default: '0',
        validator: value => validatorRange(value)
      },

    /*  
      * 陰影
      * dropShadow:{ 
      *  offset: 16, --> required
      *  blurRadius: 0, --> optional default 0 px
      *  spreadRadius: 0, --> optional default 0 px
      *  color: 'black' --> optional default black
      * }
      */
      dropShadow:{
        type: Object,
        default: null
      },

      filters:{
        type: Boolean,
        default: true
      },

      customData:{
        type: Object,
        default: null,
      }
    }
    
    const imagvueComponent = {
      name: 'imagvue',

      props,

      data(){
        return{
          lazyLoadMode: false,
          lazyTime: 0,
          lazyLoadImage: '',
          io: null ,
          options:{
            rootMargin: null,
            threshold: null,
          },
        }
      },

      render(h) {
        const slots = this.$slots.default ;

        if(slots && slots.length ===1){
          const child = slots[0];
          if( child.componentOptions && child.componentOptions.tag === "transition-group"){ 
            let { src, lazy, rootMargin='0px', threshold=0 } = child.data.attrs;
            this.lazyLoadMode = true;
            this.lazyLoadImage = src;
            this.lazyTime = lazy || 500;
            this.options.rootMargin = rootMargin;
            this.options.threshold = toInt(threshold);
          }
        }

        let children = slots;

        let attributes = null;
        const update = (attributeName, attributeValue) => { 
          attributes = buildAttribute(attributes, attributeName, attributeValue) 
        };

        const initAttribute = { 
          ...this.$attrs,
          src: this.lazyLoadMode ? this.lazyLoadImage :this.value,
          width: this.width, 
          height: this.height,
          ...( this.lazyLoadMode ? { 'data-src':this.value } : {} )
        };

        const initStyles = {
          filter: `
            blur(${ this.blur }px) 
            contrast(${ this.contrast }%)
            brightness(${ this.brightness }%)
            grayscale(${ this.grayscale }%)
            hue-rotate(${ this.hueRotate }deg)
            opacity(${ this.opacity }%)
            invert(${ this.invert }%)
            saturate(${ this.saturate }%)
            sepia(${ this.sepia }%)
            ${ dropShadowOptions( this.dropShadow ) }
          `
        }

        const initEvent = {
          error: this.onerror,
        }

        if(this.filters) update('style', initStyles);
        update('attrs', initAttribute);
        update('on', initEvent);

        // if have custom data update to imagvue
        if( this.customData ){ 
          const { on, props } = this.customData;
          update('on', {...on, ...initEvent}); //nature event Note. can't use for ex. v-on
          update('props', props); // component props
        }

        return h('img', attributes, children);
      },

      methods:{

        listenScrollEvent(entries){
          // 當圖片完全出現時
          entries.forEach(entry => {
            if(entry.intersectionRatio > 0){
              setTimeout(()=>{
                this.unObserve();
                let container = entry.target;
                container.src = container.getAttribute('data-src');
                container.removeAttribute('data-src');
              },this.lazyTime);
            }
          });
        },

        unObserve(){
          if (this.io) {
            this.io.unobserve(this.$el);
          }
        },

      },

      mounted() {
        if ( this.lazyLoadMode && ("IntersectionObserver" in window) ) {
          const { rootMargin, threshold } = this.options ;
          this.io = new IntersectionObserver(this.listenScrollEvent,{
            rootMargin,
            threshold
          });
          this.io.observe(this.$el);
        }
      },

      beforeDestroy () {
        this.unObserve();
      },

    };

    return imagvueComponent;
  }

  if (typeof exports === "object") {
    module.exports = buildImagvue();
  } else if (typeof define === "function" && define.amd) {
    define([], buildImagvue());
  } else if (window && window.Vue) {
    let imagvue = buildImagvue();
    Vue.component("imagvue", imagvue);
  }
})();