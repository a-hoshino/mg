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

	        this.rot = 0;

	        this.distance = 3000 - this.size.width;
	    }

	    /**
	     * 初期設定
	     */
	    init() {
	        this.renderer.setClearColor(0xFFFFFF, 1.0);

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
	        this.camera.position.x = this.distance * Math.sin(radian);
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

	        this.addLight();
	    }

	    /**
	     * ボールを追加する
	     */
	    addBall() {
	        // 球体
	        const geometry = new THREE.SphereGeometry(200, 30, 30);
	        const material = new THREE.MeshLambertMaterial({ color: 0xf78bbb });

	        const mesh = new THREE.Mesh(geometry, material);

	        mesh.position.set(-240, 0, 0);

	        this.scene.add(mesh);
	    }

	    /**
	     * キューブを追加する
	     */
	    addCube() {
	        // キューブ
	        const geometry = new THREE.BoxBufferGeometry(280, 280, 280);
	        const material = new THREE.MeshLambertMaterial({ color: 0x74aae6 });

	        const mesh = new THREE.Mesh(geometry, material);

	        mesh.position.set(240, 0, 0);
	        mesh.rotation.set(Math.PI / 4, Math.PI / 4, 0);

	        this.scene.add(mesh);
	    }

	    /**
	     * ライトを追加する
	     */
	    addLight() {
	        // 平行光源
	        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, .8);
	        directionalLight.position.set(1, 1, 1);
	        this.scene.add(directionalLight);

	        // 環境光源を作成
	        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.0);
	        this.scene.add(ambientLight);
	    }
	}

	const geometry = new Geometry();

	geometry.init();

/***/ })
/******/ ]);