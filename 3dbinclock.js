var binaryclock = function() {
  var cubeSize = 25; 
  var distance = 500;
  var container;

  var clock = {
    seconds: {
      z: cubeSize * 3,
      cubes: [],
      material: new THREE.MeshLambertMaterial({ color: 0xFF0000 })
    },
    minutes: {
      z: cubeSize,
      cubes: [],
      material: new THREE.MeshLambertMaterial({ color: 0x00FF00 })
    },
    hours: {
      z: -cubeSize,
      cubes: [],
      material: new THREE.MeshLambertMaterial({ color: 0xFF00FF })
    }
  };

  var renderer = new THREE.WebGLRenderer({ antialiasing: true });
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var scene = new THREE.Scene();
  var pointlight = new THREE.PointLight(0xFFFFFF);

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function setTime() {
    var now = new Date();
    setCubeScales(now.getSeconds(), clock.seconds.cubes);
    setCubeScales(now.getMinutes(), clock.minutes.cubes);
    setCubeScales(now.getHours(), clock.hours.cubes);
  }

  function setCubeScales(time, cubes) {
    for (i = 32, i2 = 0; i2 < cubes.length; i = i / 2, i2++) {
      if (time >= i) {
        time-=i;
        if (cubes[i2].scale.y < 2) {
          cubes[i2].scale.y += 0.05;
          cubes[i2].position.y += cubeSize * 0.025;
        }
      } else {
        if (cubes[i2].scale.y > 1) {
          cubes[i2].scale.y -= 0.05;
          cubes[i2].position.y -= cubeSize * 0.025;
        }
      }
    }
  }

  function addCubeSet(part) {
    for (i = 0; i < 6; i++) {
      part.cubes[i] = new THREE.Mesh(new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize), part.material);
      part.cubes[i].position.x = -1 * (cubeSize * 5) + ((cubeSize * 2) * i);
      part.cubes[i].position.z = part.z;
      scene.add(part.cubes[i]);
    }
  }

  function animate() {
    requestAnimationFrame( animate );
    setTime();
    renderer.render(scene, camera);
  }

  function init() {
    camera.position = new THREE.Vector3(130, 70, 250);
    camera.rotation = new THREE.Euler(-0.2, 0.5, 0.1, "XYZ");

    pointlight.position = new THREE.Vector3(100, 100, 200);

    container = document.getElementById( 'container' );
    container.appendChild(renderer.domElement);

    scene.add(pointlight);
    renderer.setSize(window.innerWidth, window.innerHeight);

    addCubeSet(clock.seconds);
    addCubeSet(clock.minutes);
    addCubeSet(clock.hours);

    window.addEventListener( 'resize', resize, false );

    animate();
  }

  return {
    start: init
  };
}();

binaryclock.start();
