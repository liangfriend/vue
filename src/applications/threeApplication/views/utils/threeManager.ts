import * as THREE from 'three';
import { ArcballController } from 'three/examples/jsm/Addons.js';
class ThreeManager {
  // 变量
  private unitTable: Map<number, any>;

  // 构造函数
  constructor() {
    this.unitTable = new Map();
  }

  // 方法

  // 创建场景：返回场景ID
  createScene(targetDom: Document, options: any = {}): number {
    const op = Object.assign({}, options);
    const id = this.getRandomID();
    const scene = new THREE.Scene();
    this.unitTable.set(id, scene);
    return id;
  }

  // 创建相机：返回相机ID
  createCamera(sceneID: number, options: any = {}): number {
    const op = Object.assign({}, options);
    const id = this.getRandomID();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.unitTable.set(id, camera);
    // 具体实现省略
    return id;
  }

  // 创建渲染器：返回渲染器ID
  createRenderer(sceneID: number, options: any = {}): number {
    const op = Object.assign({}, options);
    const id = this.getRandomID();
    const renderer = new THREE.WebGLRenderer();
    this.unitTable.set(id, renderer);
    // 具体实现省略
    return id;
  }

  // 添加几何信息：返回几何信息ID
  addGeometry(type: string, options: any = {}): number {
    const op = Object.assign({}, options);
    // 具体实现省略
    return 0;
  }

  // 添加材质：返回材质ID
  addMaterial(geometryID: number, options: any = {}): number {
    const op = Object.assign({}, options);
    // 具体实现省略
    return 0;
  }

  // 添加物体：返回物体ID
  addObject(sceneID: number, geometryID: number, materialID: number, options: any): number {
    const op = Object.assign({}, options);
    // 具体实现省略
    return 0;
  }

  // 添加模型：返回模型ID
  addModel(sceneID: number, type: string, options: any = {}): number {
    const op = Object.assign({}, options);
    // 具体实现省略
    return 0;
  }

  // 添加光：返回光ID
  addLight(sceneID: number, type: string, options: any = {}): number {
    const op = Object.assign({}, options);
    // 具体实现省略
    return 0;
  }

  // 添加控制器：返回控制器ID
  addController(sceneID: number, cameraID: number, rendererID: number, options: any = {}): number {
    const op = Object.assign({}, options);
    const id = this.getRandomID();
    const scene = this.getUnit(sceneID);
    const camera = this.getUnit(cameraID);
    const renderer = this.getUnit(rendererID);

    const controller = new ArcballController(camera, renderer.domElement, scene);
    this.unitTable.set(id, controller);
    return id;
  }
  //获取单位
  getUnit(id: number) {
    return this.unitTable.get(id);
  }
  // 删除单位
  removeUnit(unitID: number): void {
    // 具体实现省略
  }

  // 获取随机ID
  getRandomID(): number {
    return Date.now();
  }
  //动画函数
  animate(rendererID: number, sceneID: number, cameraID: number): void {
    const renderer = this.getUnit(rendererID);
    const scene = this.getUnit(sceneID);
    const camera = this.getUnit(cameraID);
    function animate() {
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  }

  // ---------------------------------------------------高级方法--------------------------------------------

  // 创建3D视图：{场景ID, 渲染器ID, 相机ID}
  create3DView(targetDom: Document, options: any = {}): { sceneID: number; cameraID: number; rendererID: number; controllerID: number } {
    const op = Object.assign({}, options);
    const sceneID = this.createScene(targetDom);
    const cameraID = this.createCamera(sceneID);
    const rendererID = this.createRenderer(sceneID);
    const controllerID = this.addController(sceneID, cameraID, rendererID);
    return { sceneID, cameraID, rendererID, controllerID };
  }

  // 添加几何物体：{几何信息ID, 材质ID, 物体ID}
  addGeometryObject(geometryID: number, materialID: number, objectID: number, options: any): void {
    const op = Object.assign({}, options);

    // 具体实现省略
  }
}
