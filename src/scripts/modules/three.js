import Component from '../utils/component.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class Module extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const canvas = this.state.element
    try {
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
      })

      const fov = 40
      const aspect = 2
      const near = 0.1
      const far = 1000
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      camera.position.z = 120

      const scene = new THREE.Scene()

      {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 100)
        directionalLight.position.set(0, 1, 0)
        directionalLight.castShadow = true
        scene.add(directionalLight)
      }

      let model = null
      {
        const loader = new GLTFLoader(this.loadingManager)
        loader.load(
          '/media/scene.gltf',
          gltf => {
            model = gltf.scene.children[0]
            model.scale.set(4, 4, 4)
            scene.add(gltf.scene)
          },
          undefined,
          error => {
            console.error(error)
          }
        )
      }

      const resizeRendererToDisplaySize = renderer => {
        const canvas = renderer.domElement
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        const needResize = canvas.width !== width || canvas.height !== height
        if (needResize) {
          renderer.setSize(width, height, false)
        }
        return needResize
      }

      const render = (time) => {
        time *= 0.001

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }

        if (model) {
          const rot = time
          model.rotation.x = rot
          model.rotation.y = rot * 1.5
        }

        renderer.render(scene, camera)

        requestAnimationFrame(render)
      }

      requestAnimationFrame(render)
    } catch (e) {
      console.log(e)
    }
  }
}
