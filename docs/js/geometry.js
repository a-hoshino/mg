var mg = mg || {}; mg["geometry"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	/////////////////////////////////////////
	// 幾何学
	/////////////////////////////////////////

	class Geometry {
	    /**
	     * コンストラクタ
	     */
	    constructor() {
	        this.canvas = document.getElementById('canvas');

	        this.size = {
	            width: window.innerWidth,
	            height: window.innerHeight
	        };

	        this.renderer = new THREE.WebGLRenderer({
	            canvas: this.canvas,
	            antialias: true
	        });

	        this.scene = new THREE.Scene();

	        this.camera = new THREE.PerspectiveCamera(45, this.size.width / this.size.height, 1, 10000);

	        // 撮影角度
	        this.rot = 10;

	        // 撮影距離
	        this.distance = 3000 - this.size.width;
	    }

	    /**
	     * 初期設定
	     */
	    init() {
	        this.renderer.setClearColor(0xFFFFFF, 1.0);

	        this.renderer.shadowMap.enabled = true;

	        this.resetCamera();

	        this.resizeCanvas(this.size.width, this.size.height);

	        this.createScene();

	        this.renderer.render(this.scene, this.camera);

	        // ウィンドウに合わせてキャンバスをリサイズする
	        window.addEventListener('resize', () => {
	            [this.size.width, this.size.height] = [window.innerWidth, window.innerHeight];

	            this.distance = 3000 - this.size.width;

	            this.resetCamera();

	            this.resizeCanvas(this.size.width, this.size.height);

	            this.renderer.render(this.scene, this.camera);
	        });
	    }

	    /**
	     * カメラ位置を設定する
	     */
	    resetCamera() {
	        // ラジアンに変換する
	        const radian = this.rot * Math.PI / 180;

	        // 角度に応じてカメラの位置を設定
	        this.camera.position.y = this.distance * Math.sin(radian);
	        this.camera.position.z = this.distance * Math.cos(radian);

	        // 原点方向を見つめる
	        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	    }

	    /**
	     * キャンバスサイズを設定する
	     */
	    resizeCanvas(width, height) {
	        this.camera.aspect = width / height;

	        this.camera.updateProjectionMatrix();

	        this.renderer.setSize(width, height);
	    }

	    /**
	     * シーンを構成する
	     */
	    createScene() {
	        this.addBall();

	        this.addCube();

	        this.addHoop();

	        this.addLight();
	    }

	    /**
	     * ボールを追加する
	     */
	    addBall() {
	        // 球体
	        const geometry = new THREE.SphereGeometry(100, 30, 30);
	        const material = new THREE.MeshLambertMaterial({ color: 0xf78bbb });

	        const mesh = new THREE.Mesh(geometry, material);

	        mesh.castShadow = true;

	        mesh.position.set(40, 250, 0);

	        this.scene.add(mesh);
	    }

	    /**
	     * キューブを追加する
	     */
	    addCube() {
	        // キューブ
	        const geometry = new THREE.BoxBufferGeometry(300, 300, 300);
	        const material = new THREE.MeshLambertMaterial({ color: 0x74aae6 });

	        const mesh = new THREE.Mesh(geometry, material);

	        mesh.receiveShadow = true;

	        mesh.position.set(0, 0, 0);
	        mesh.rotation.set(0, Math.PI / 4, 0);

	        this.scene.add(mesh);
	    }

	    /**
	     * フープを追加する
	     */
	    addHoop() {
	        // フープ
	        const geometry = new THREE.RingBufferGeometry(300, 310, 640);
	        const material = new THREE.MeshPhongMaterial({ color: 0xeeeeee });

	        const mesh = new THREE.Mesh(geometry, material);

	        mesh.position.set(-100, 150, -200);
	        mesh.rotation.set(0, 0, 0);

	        this.scene.add(mesh);
	    }

	    /**
	     * 背景を追加する
	     */
	    addBackground() {
	        const geometry = new THREE.PlaneBufferGeometry(100, 100);
	        const material = new THREE.MeshLambertMaterial({ color: 0xeeeeee });

	        const mesh = new THREE.Mesh(geometry, material);

	        mesh.position.set(0, -500, 0);
	        mesh.rotation.set(Math.PI / 4, 0, 0);

	        this.scene.add(mesh);
	    }

	    /**
	     * ライトを追加する
	     */
	    addLight() {
	        // 平行光源
	        // const directionalLight = new THREE.DirectionalLight(0xFFFFFF, .2);
	        // directionalLight.position.set(2000, 3200, 2000);
	        // directionalLight.castShadow = true;
	        // this.scene.add(directionalLight);

	        // スポット光源
	        const spotLight = new THREE.SpotLight(0xFFFFFF, .6);
	        spotLight.position.set(2000, 3200, 2000);
	        spotLight.castShadow = true;
	        this.scene.add(spotLight);

	        // 環境光源を作成
	        const ambientLight = new THREE.AmbientLight(0xFFFFFF, .7);
	        this.scene.add(ambientLight);
	    }
	}

	const geometry = new Geometry();

	geometry.init();

/***/ })
/******/ ]);