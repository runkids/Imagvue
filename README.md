# Imagvue <img style=" text-align: center;" width='45' min-width="45" src="https://github.com/runkids/Imagvue/blob/master/demo/Imagvue.png?raw=true"/> 

[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/) [![npm](https://img.shields.io/npm/v/imagvue.svg)](https://www.npmjs.com/package/imagvue)


- `Imagvue` provides basic image processing props(size,blur,contrast,grayscale, etc.).

- Support image lazy loading.

- All Attributes can bind with data

<img src="https://github.com/runkids/Imagvue/blob/master/demo/Imagvue.gif?raw=true"/>

## Demo

[![Edit imagvue demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/n7ykx4rxyp?module=%2Fsrc%2FApp.vue&view=preview)


## Installation 
Get from npm / yarn:
```js
npm i imagvue
```
```js
yarn add imagvue
```
or just include [imagvue.js](https://github.com/runkids/Imagvue/blob/master/dist/imagvue.js) to your view like 

```html
<script src='./imagvue.js'></script>
```

## Usage

##### html:
```html
<imagvue v-model="url" width="400" height="600"></imagvue>
```

##### vue file:
``` js
import imagvue from 'imagvue'

export default {
  name: 'app',
  components: {
    imagvue,
  },
  data(){
    return {
      url: 'https://source.unsplash.com/random',
      localURL: require('./imagvue.png'),
    }
  }
}
```

## Lazy loading Image

[DEMO](https://runkids.github.io/f2e/week2/)

##### how to use ?
Use `transition-group` and set attribute `src` with your loading image inner `imagvue`.
Also you can set attribute`lazy` for delay time.

##### 1. src
Type: `String`<br>
Required: `ture`<br>

Your loading image.

##### 2. lazy
Type: `Number`<br>
Default: `0`

Show image delay time.

##### 3. rootMargin

Type: `String`<br>
Default: `0px`

Syntax similar to that of CSS Margin

[rootMargin](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin)

##### 4. threshold 
Type: `Number`<br>
Default: `0`

Ratio of element convergence

[threshold](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds)

```html
  <imagvue
    v-model="url"
    :onerror="()=>url='https://i.stack.imgur.com/cl91I.png'"
    width="400" 
    height="600"
  >
    <transition-group 
      :src="require(loading.gif)" --> your loading image
      :lazy="500" --> lazy time , default is 0 ( ms )
      rootMargin="0px 0px"
      :threshold="0.1"
    >
    </transition-group> 
  </imagvue>
```

<img src="https://i.imgur.com/fZBnjST.gif"/>


##### Browser Support

Available in [latest browsers](http://caniuse.com/#feat=intersectionobserver). If browser support is not available, use this [polyfill](https://www.npmjs.com/package/intersection-observer).


## Props

#####  1. value
Type: `String`<br>
Required: `ture`<br>

The image URL. This is mandatory for the `<imagvue> `
```html
<imagvue v-model="url"></imagvue>
```

#####  2. width
Type: `String` , `Number`<br>
Required: `false`<br>
Default: `auto`

The intrinsic width of the image in pixels.

#####  3. height
Type: `String` , `Number`<br>
Required: `false`<br>
Default: `auto`

The intrinsic height of the image in pixels.

#####  4. onerror
Type: `Function`<br>
Required: `false`

If an error occurs while trying to load or render an image ,
call a function 

```html
<imagvue 
  v-model="url"
  :onerror="()=>url='./error.png'"
>
</imagvue>
```

<img src="https://i.imgur.com/gRfQcHz.png" width='250' min-width="250"/>

#####  5. blur
Type: `String` , `Number`<br>
Required: `false`<br>
Default: 0

Applies a Gaussian blur to the input image.<br>
Range: 0 ~ larger value ( px )

```html
<imagvue v-model="url" :blur="50"></imagvue>
```

<img src="https://i.imgur.com/NcMztdp.png"/>

#####  6. contrast
Type: `String` , `Number`<br>
Required: `false`<br>
Default: 100

Adjusts the contrast of the input.<br>
Range: 0 ~ over 100 ( % )

```html
<imagvue v-model="url" :contrast="50"></imagvue>
```

<img src="https://i.imgur.com/ttFA4g2.png"/>

#####  7. brightness
Type: `String` , `Number`<br>
Required: `false`<br>
Default: 100

Applies a linear multiplier to input image<br>
Range: 0 ~ over 100 ( % )

```html
<imagvue v-model="url" :brightness="50"></imagvue>
```

<img src="https://i.imgur.com/GIK27Ec.png"/>

#####  8. grayscale
Type: `String` , `Number`<br>
Required: `false`<br>
Default: 0

Converts the input image to grayscale.<br>
Range: 0 ~ 100 ( % )

```html
<imagvue v-model="url" :grayscale="50"></imagvue>
```

<img src="https://i.imgur.com/OB7ulNZ.png"/>

#####  9. hueRotate
Type: `String` , `Number`<br>
Required: `false`<br>
Default: 0

Applies a hue rotation on the input image.<br>
Range: 0 ~ 360 ( deg )

```html
<imagvue v-model="url" :hue-rotate="50"></imagvue>
```

<img src="https://i.imgur.com/qMpfv5a.png"/>

#####  10. invert
Type: `String` , `Number`<br>
Required: `false`<br>
Default: 0

Inverts the samples in the input image.<br>
Range: 0 ~ 100 ( % )

```html
<imagvue v-model="url" :invert="50"></imagvue>
```

<img src="https://i.imgur.com/Xb7cuvT.png"/>

#####  11. opacity
Type: `String` , `Number`<br>
Required: `false`<br>
Default: 0

Applies transparency to the samples in the input image.<br>
Range: 0 ~ 100 ( % )

```html
<imagvue v-model="url" :opacity="50"></imagvue>
```

<img src="https://i.imgur.com/71eAINo.png"/>

#####  12. saturate
Type: `String` , `Number`<br>
Required: `false`<br>
Default: 0

Saturates the input image.<br>
Range: 0 ~ 100 ( % )

```html
<imagvue v-model="url" :saturate="50"></imagvue>
```

<img src="https://i.imgur.com/kwZp0vz.png"/>

#####  13. sepia
Type: `String` , `Number`<br>
Required: `false`<br>
Default: 0

Converts the input image to sepia.<br>
Range: 0 ~ 100 ( % )

```html
<imagvue v-model="url" :sepia="50"></imagvue>
```

<img src="https://i.imgur.com/o0t9TCD.png"/>

#####  14. dropShadow
Type: `Object`<br>
Required: `false`<br>
Default: null

Applies a drop shadow effect to the input image.

  - `offset`: This value to set the shadow offset.
  - `blurRadius`: The larger this value, the bigger the blur, so the shadow becomes bigger and lighter.
  - `spreadRadius`: Positive values will cause the shadow to expand and grow bigger, and negative values will cause the shadow to shrink.
  - `color`: The color of the shadow.

```js
export default {
  name: 'app',
  components: {
    imagvue,
  },
  data(){
    return {
      dropShadow:{ 
        offset: 16, --> required
        blurRadius: 0, --> optional default 0 px
        spreadRadius: 0, --> optional default 0 px
        color: 'black' --> optional default black
      }
    }
  }
}
```

```html
<imagvue v-model="url" :dropShadow="dropShadow"></imagvue>
```

<img src="https://i.imgur.com/VmnJnXR.png"/>

#####  15. filters
Type: `Boolean` <br>
Required: `false`<br>
Default: true

if you won't to use filters ( blur,contrast,grayscale, etc.).<br>
just set props `filters` to false

```html
<imagvue v-model="url" :filters="false"></imagvue>
```

#####  16. customData
Type: `Object` <br>
Required: `false`<br>
Default: null

This is used to pass additional information to `<imagvue>`

- on: events to be subscribe of `<imagvue>`
- props: props to be passed to `<imagvue>`

```html
<imagvue v-model="url" :customData="customData()"></imagvue>
```

```js
methods:{
    onLoadEvent(){
      //todo
    },
    customData(){
      return {
        on: {
          load: this.onLoadEvent,
        }
      }
    }
}
```


## Code Example

```html
<template>
  <div class="container">
      <imagvue class="lazyimage"
          v-for="d in loadUrls" :key="d.url"
          :onerror="()=>d.url=errorURL"
          :value="d.url"
          width="400" 
          height="267"
          :blur="filters.blur"
          :brightness="filters.brightness"
          :contrast="filters.contrast"
          :grayscale="filters.grayscale"
          :hue-rotate="filters.rotate"
          :opacity="filters.opacity"
          :invert="filters.invert"
          :saturate="filters.saturate"
          :sepia="filters.sepia"
          :dropShadow="dropShadow"
          :customData="customData()"
      >
        <transition-group :src="d.lazy" :lazy="0" rootMargin="0px 0px" :threshold="0.1"></transition-group>
      </imagvue>
  </div>
</template>
```

```js
<script>
import imagvue from 'imagvue';
export default {
  components:{
    imagvue,
  },
  data(){
    return{
      filters: {
        blur: 0,
        contrast: 100,
        brightness: 100,
        grayscale: 0,
        rotate: 0,
        opacity: 100,
        invert: 0,
        saturate: 100,
        sepia: 0,
        dropShadow:{ 
          offset: 16,
          blurRadius: 10, 
          spreadRadius: 10, 
          color: 'black'
        }
      },
      errorURL:'https://cdn.browshot.com/static/images/not-found.png',
      loadUrls:[
        {url:'https://goo.gl/PxTSno' , lazy:'https://goo.gl/aiwqia'},
        {url:'https://goo.gl/K1kZWk' , lazy:'https://goo.gl/vnHTAh'},
        {url:'https://goo.gl/gTZMkF' , lazy:'https://goo.gl/K1Mheq'},
        {url:'https://goo.gl/PxTSno1' , lazy:'https://goo.gl/aiwqia'},
      ]
    }
  },
  methods:{
    onLoadEvent(){
      console.log("Image on load!");
    },
    customData(){
      return {
        on: {
          load: this.onLoadEvent,
        }
      }
    }
  }
}
</script>
```
```css
<style>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.lazyimage{
  max-width: 100%;
  display: block;
  margin: 1024px auto 128px;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
```
## License
Imagvue is licensed under MIT License.
