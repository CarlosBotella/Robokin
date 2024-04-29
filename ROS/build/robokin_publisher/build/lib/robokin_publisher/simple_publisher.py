import math

import rclpy
# importamos las librerias ROS2 de python 
from rclpy.node import Node
# importamos los mensajes tipo Twist
from geometry_msgs.msg import Twist
from math import pi

# creamos una clase pasándole como parámetro el Nodo
class SimplePublisher(Node):

    def __init__(self):
        # Constructor de la clase
        # ejecutamos super() para inicializar el Nodo
        # introducimos le nombre del nodo como parámetro
        super().__init__('simple_publisher')
        # creamos el objeto publisher
        # que publicara en el topic /cmd_vel 
        # la cola del topic es de 10 mensajes
        self.publisher_ = self.create_publisher(Twist, 'cmd_vel', 10)
        # definimos un periodo para publicar periodicamente
        self.__timer_period = 0.5
        self.__contador = 0
        # creamos un timer con dos parametros:
        # - el periodo (0.5 seconds)
        # - la funcion a realizar  (timer_callback)
        self.timer = self.create_timer(self.__timer_period, self.timer_callback)

    def timer_callback(self):
        # creamos el mensaje tipo Twist
        msg = Twist()
        # define la velocidad lineal en el eje x 
        msg.linear.x = 0.2
        # define tla velocidad angular en el eje z
        msg.angular.z = 0.1
        # Publicamos el mensaje en el topic
        self.publisher_.publish(msg)
        self.__contador = self.__contador + self.__timer_period
        # Mostramos el mensaje por el terminal
        self.get_logger().info('Publishing: "%s"' % msg)

        if (float(self.__contador) >= float((4*math.pi)/msg.angular.z)):
            self.__parar()

    def __parar(self):
        msg = Twist()
        msg.linear.x = 0.00
        msg.angular.z = 0.00
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg)
            
def main(args=None):
    # inicializa la comunicación
    rclpy.init(args=args)
    # declara el constructor del nodo 
    simple_publisher = SimplePublisher()
    # dejamos vivo el nodo
    # para parar el programa habrá que matar el node (ctrl+c)
    rclpy.spin(simple_publisher)
    # destruye en nodo
    simple_publisher.destroy_node()
    # se cierra la comunicacion ROS
    rclpy.shutdown()

if __name__ == '__main__':
    main()
