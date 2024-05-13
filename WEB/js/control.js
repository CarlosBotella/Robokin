document.addEventListener('DOMContentLoaded', event => {
    console.log("entro en la pagina")

    //Botones
    document.getElementById("btn_con").addEventListener("click", connect)
    document.getElementById("btn_dis").addEventListener("click", disconnect)
    document.getElementById("btn_delante").addEventListener("click", delante)
    document.getElementById("btn_stop").addEventListener("click", stop)
    document.getElementById("btn_izquierda").addEventListener("click", izquierda)
    document.getElementById("btn_derecha").addEventListener("click", derecha)
    document.getElementById("btn_mesa").addEventListener("click", irmesa)



    //Variables
    var alante = 0.0
    var lados = 0.0

    data = {
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090/',
        connected: false,
        service_busy: false,
        service_response: ''
    }

    //Funciones
    function connect() {
        console.log("Clic en connect")

        data.ros = new ROSLIB.Ros({
            url: data.rosbridge_address
        })

        console.log("Intentando conectar con ROSBridge en: " + data.rosbridge_address)

        // Define callbacks
        data.ros.on("connection", () => {
            data.connected = true
            console.log("Conexion con ROSBridge correcta")
            subscribe()
            document.getElementById("estado").textContent = "Estado: CONECTADO"
        })
        data.ros.on("error", (error) => {
            console.log("Se ha producido algun error mientras se intentaba realizar la conexion")
            console.log(error)
        })
        data.ros.on("close", () => {
            data.connected = false
            console.log("Conexion con ROSBridge cerrada")
        })
    }

    function disconnect() {
        data.ros.close()
        data.connected = false
        console.log('Clic en botón de desconexión')
        document.getElementById("estado").textContent = "Estado: DESCONECTADO"
    }

    document.getElementById("btn_delante").addEventListener("click", delante)
    function call_delante_service(valor) {
        data.service_busy = true
        data.service_response = ''

        //definimos los datos del servicio
        let service = new ROSLIB.Service({
            ros: data.ros,
            name: '/movement',
            serviceType: 'custom_interface/srv/MyMoveMsg'
        })

        let request = new ROSLIB.ServiceRequest({
            move: valor
        })

        service.callService(request, (result) => {
            data.service_busy = false
            data.service_response = JSON.stringify(result)
        }, (error) => {
            data.service_busy = false
            console.error(error)
        })
    }

    function delante() {
        alante = alante + 0.1
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: { x: alante, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: lados, },
        })

        topic.publish(message)
    }
    function stop() {
        lados = 0.0
        alante = 0.0
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: { x: alante, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: lados, },
        })

        topic.publish(message)
    }



    function izquierda() {
        lados = lados + 0.1

        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: { x: alante, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: lados, },
        })
        topic.publish(message)


    }

    function derecha() {

        lados = lados - 0.1

        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: { x: alante, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: lados, },
        })
        topic.publish(message)


    }


    function irmesa() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/goal_pose',
            messageType: 'geometry_msgs/PoseStamped'
        })

        let currentTime = new Date().getTime(); // Tiempo actual en milisegundos
        let seconds = Math.floor(currentTime / 1000); // Segundos
        let nanoseconds = (currentTime % 1000) * 1000000; // Nanosegundos


        let message = new ROSLIB.Message({
            header: {
                frame_id: 'map',
                stamp: {
                    secs: seconds,
                    nsecs: nanoseconds
                }
            },
            pose: {
                position: { x: 2.0, y: 0.4, z: 0, },
                orientation: { x: 0, y: 0, z: 0, w: 2 }
            },
        })

        topic.publish(message)
    }
    function subscribe() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/odom',
            messageType: 'nav_msgs/Odometry'
        })

        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        let radius = 1; // Radio del círculo

        var rectangulo = {
            x1: -8.8,
            y1: 10.9,
            x2: 6.06,
            y2: -12.9
        };

        topic.subscribe((message) => {
            //console.log(message)

        })
        topic.subscribe((message) => {
            data.position = message.pose.pose.position

            // Dibujar un círculo en las coordenadas x e y del robot
            let x = data.position.x;
            let y = data.position.y;

            // Convertir las coordenadas al sistema de coordenadas del rectángulo
            var relX = ((-rectangulo.x1 * canvas.width)+(x*canvas.width))/(rectangulo.x2-rectangulo.x1)
            var relY = ((-rectangulo.y1 * canvas.height)+(y*canvas.height))/(rectangulo.y2-rectangulo.y1)

            ctx.beginPath();
            ctx.arc(relX, relY, radius, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.closePath();

        })
    }


    //Mapa
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    const img = new Image();
    img.src = '../img/plano_cafe.jpg';
    img.onload = () => {
        ctx.imageSmoothingQuality = "low"
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    function getMousePosition(canvas, event) {
        var rectangulo = {
            x1: -8.8,
            y1: 10.9,
            x2: 6.06,
            y2: -12.9
        };
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        var porcenatdawj = (x / canvas.width)
        console.log(porcenatdawj)

        // Convertir las coordenadas al sistema de coordenadas del rectángulo
        var relX = (x / canvas.width) * (rectangulo.x2 - rectangulo.x1) + rectangulo.x1;
        var relY = (y / canvas.height) * (rectangulo.y2 - rectangulo.y1) + rectangulo.y1;

        var color = ctx.getImageData(x, y, 1, 1).data
        console.log(color)
        
        if (color[0] != color[1] && color[1] != color[2]) {
            console.log("Coordinate x: " + relX,
                "Coordinate y: " + relY)
            navigate_to_pose(relX, relY)
        }


    }

    let canvasElem = document.querySelector("canvas");

    canvasElem.addEventListener("mousedown", function (e) {
        getMousePosition(canvasElem, e);
    });


    function navigate_to_pose(x, y) {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/goal_pose',
            messageType: 'geometry_msgs/PoseStamped'
        })

        let currentTime = new Date().getTime(); // Tiempo actual en milisegundos
        let seconds = Math.floor(currentTime / 1000); // Segundos
        let nanoseconds = (currentTime % 1000) * 1000000; // Nanosegundos


        let message = new ROSLIB.Message({
            header: {
                frame_id: 'map',
                stamp: {
                    secs: seconds,
                    nsecs: nanoseconds
                }
            },
            pose: {
                position: { x: x, y: y, z: 0, },
                orientation: { x: 0, y: 0, z: 0, w: 1 }
            },
        })

        topic.publish(message)
    }
})