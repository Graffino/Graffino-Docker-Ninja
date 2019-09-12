import Component from '../utils/component.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Module extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    const canvas = this.state.element
    const renderer = new THREE.WebGLRenderer({
      canvas
      // alpha: true
    })

    const fov = 40
    const aspect = 2
    const near = 0.1
    const far = 1000
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 120

    const scene = new THREE.Scene()

    scene.background = new THREE.Color(0xAAAAAA)

    {
      const color = 0xffffff
      const intensity = 1
      const light = new THREE.DirectionalLight(color, intensity)
      light.position.set(-1, 2, 4)
      scene.add(light)
    }

    {
      const loader = new GLTFLoader(this.loadingManager)
      loader.load(
        '/media/scene.gltf',
        gltf => {
          const root = gltf.scene
          scene.add(root)
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

    const render = () => {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
      }

      renderer.render(scene, camera)

      requestAnimationFrame(render)
    }

    requestAnimationFrame(render)
  }
}
