<template>
    <div id="cesiumContainer"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import * as Cesium from 'cesium';
import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer } from 'cesium';

// This is the default access token from your ion account

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NjllNmZlNS0xM2YzLTQzMWUtODA5NC0wOWIwZWNjYjY4YjIiLCJpZCI6MTUzMjk5LCJpYXQiOjE2ODkxMzM5NzR9.4CyEvfsywwOPuDuEFpXGkG7jSlN6QNmHDFcNzxxEPpQ';
const viewer = ref(null);
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
    loadModel(); 
})
const loadModel = () => {
    
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
    let ety = viewer.value.entities.add({
        position: position,
        orientation: orientation,
        model:{
            uri: '/SU7.glb',
            minimumPixelSize: 128,
            maximumScale: 20000
        }
    })
    console.log(ety)
    viewer.value.trackedEntity = ety;

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
</style>