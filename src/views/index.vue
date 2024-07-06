<template>
    <div id="cesiumContainer"></div>
    <CircleProgressBar v-if="precentValue<100" :percentage="true" animationDuration='1.0s' strokeWidth="10" :value="precentValue" :max="100" />
    <div class="bottom-color-choose" v-show="precentValue>=100">
        <div class="color-item" @click="tochangeColor('blue')"></div>
        <div class="color-item" style="background-color: violet;" @click="tochangeColor('viole')"></div>
        <div class="color-item" style="background-color: green;" @click="tochangeColor('green')"></div>
        <div class="color-item" style="background-color: yellow;" @click="tochangeColor('yellow')"></div>
        <div class="color-item" style="background-color: white;" @click="tochangeColor('white')"></div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import * as Cesium from 'cesium';
import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer } from 'cesium';
import { CircleProgressBar } from 'circle-progress.vue';

// This is the default access token from your ion account

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NjllNmZlNS0xM2YzLTQzMWUtODA5NC0wOWIwZWNjYjY4YjIiLCJpZCI6MTUzMjk5LCJpYXQiOjE2ODkxMzM5NzR9.4CyEvfsywwOPuDuEFpXGkG7jSlN6QNmHDFcNzxxEPpQ';
const viewer = ref(null);
const carEntity = ref(null);
const precentValue = ref(0);
onMounted(() => {
    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
    viewer.value = new Viewer('cesiumContainer', {
        animation: false, 
        baseLayerPicker: false, 
        geocoder: false, 
        homeButton: true, 
        infoBox: false, 
        sceneModePicker: false, 
        selectionIndicator: false, 
        timeline: false, 
        fullscreenButton: false,
        navigationHelpButton: false
    });
    // 定位
    // cesium-viewer-bottom
    // 关闭copyright
    document.querySelector(".cesium-viewer-bottom").style.display = "none";
    const position = Cesium.Cartesian3.fromDegrees(
        119.0744619,
        44.0503706,
        0.0
    );
    var entity = viewer.value.entities.add({
        position: position,
        label: {
            text: " ",
        },
    });
    viewer.value.trackedEntity = entity;
    viewer.value.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(
            119.0744619,
            44.0502706,
            1.0
        ),
        orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: 0,
            roll: 0.0
        },
        distance : 100
    })
    loadModel('/SU7b.glb'); 
    let timer = setInterval(() => {
        precentValue.value = precentValue.value + Math.random() * 15;
        if(precentValue.value >= 100){
            clearInterval(timer);
        }
    }, 1000);
})
const tochangeColor = (color) => {
    switch (color) {
        case 'blue':
            if(viewer.value.entities.contains(carEntity.value)){
                viewer.value.entities.remove(carEntity.value);
            }
            loadModel('/SU7b.glb'); 
            break;
        case 'viole':
            loadModel('/SU7.glb'); 
            break;
        case 'green':
            loadModel('/SU7g.glb'); 
            break;
        case'yellow':   
            loadModel('/SU7y.glb'); 
            break;
        case 'white':
            loadModel('/SU7w.glb'); 
            break;
    }
}
   
const loadModel = (uriStr) => {
    // Position a model with modelMatrix and display it with a minimum size of 128 pixels
    const position = Cesium.Cartesian3.fromDegrees(
        119.0744619,
        44.0503706,
        0.0
    );
    const heading = 0;
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
    );
    carEntity.value = viewer.value.entities.add({
        position: position,
        orientation: orientation,
        model:{
            uri: uriStr,
            minimumPixelSize: 128,
            maximumScale: 20000
        }
    })
    
    // viewer.value.entities.add({
    //     position: Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
    //     label: {
    //         text: "Philadelphia",
    //         font: "24px Helvetica",
    //         fillColor: Cesium.Color.SKYBLUE,
    //         outlineColor: Cesium.Color.BLACK,
    //         outlineWidth: 2,
    //         style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    //     },
    // });
    // const fixedFrameTransform = Cesium.Transforms.localFrameToFixedFrameGenerator(
    //     "north",
    //     "west"
    // );
    // Cesium.Model.fromGltfAsync({
    //     url: '/cube.glb',
    //     modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
    //         position,
    //         hpr,
    //         Cesium.Ellipsoid.WGS84,
    //         fixedFrameTransform
    //     ),
    //     minimumPixelSize: 128,
    // }).then(m => {
    //     console.log(m);
    //     viewer.value.scene.primitives.add(m);
    // })
// try {
    //     const model = Cesium.Model.fromGltfAsync({
    //         url: '/cube.glb',
    //         modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
    //             position,
    //             headingPositionRoll,
    //             Cesium.Ellipsoid.WGS84,
    //             fixedFrameTransform
    //         ),
    //         minimumPixelSize: 128,
    //     }).then(m => {
    //         console.log(m);
    //         var entity = viewer.value.entities.add({
    //             position : position,
    //             primitive : m
    //         });
    //         viewer.value.entities.add(m);
    //         viewer.value.trackedEntity = entity;
    //     })
    //     console.log(model);
    // } catch (error) {
    //     console.log(`Failed to load model. ${error}`);
    // }

}
</script>
<style>
#cesiumContainer{
    width: 100%;
    height: 100%;
}
#app .circle-progress{
    position: absolute;
    width: 100%;
    height: 100%;
}
#app .circle-progress__percentage {
    color: aliceblue;
}
#app .bottom-color-choose{
    position: absolute; bottom: 50px;display: flex;justify-content: space-around; transition: all 3s;width: 100%;
}
#app .color-item{
    background-color: blue; width: 100px; height: 50px;border-radius: 3px; border: 2px dashed lightcyan;
}
</style>