import os
import numpy as np
import tensorflow as tf
import cv2
from tensorflow.keras.preprocessing import image
from sensor_msgs.msg import Image
from rclpy.node import Node
from cv_bridge import CvBridge, CvBridgeError
from sensor_msgs.msg import Image
from rclpy.node import Node
from rclpy.qos import ReliabilityPolicy, QoSProfile
import time
import os

class Ros2OpenCVImageConverter(Node):
    def _init_(self):
        super()._init_('Ros2OpenCVImageConverter')
        self.bridge_object = CvBridge()
        self.image_sub = self.create_subscription(Image, '/image', self.camera_callback, QoSProfile(depth=10, reliability=ReliabilityPolicy.BEST_EFFORT))

    def camera_callback(self, data):
        if not self.image_received:
            print("camera callback called")
            try:
                # Seleccionamos bgr8 porque es la codificacion de OpenCV por defecto
                cv_image = self.bridge_object.imgmsg_to_cv2(data, desired_encoding="bgr8")
                img2 = None
                img2 = cv_image.copy()
                cv2.imwrite('../imagen_lata.jpg', img2)

                # Esperar hasta que el archivo esté disponible
                # max_wait_time = 10  # Tiempo máximo de espera en segundos
                # wait_time = 0
            
                # Marcar que ya se recibió la imagen
                self.image_received = True

                # Cancelar la suscripción
                self.image_sub.destroy()

                quit()

            except CvBridgeError as e:
                print(e)

            #cv2.waitKey(1)

def preprocess_image(image_path):
    """Carga y preprocesa una imagen individual."""
    img = image.load_img(image_path, target_size=(150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) # Añadir dimensión del batch
    img_array /= 255.0 # Normalizar entre 0 y 1
    return img_array

def main():
    # Ruta del modelo entrenado
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = '/home/eduard/Escritorio/Robokin2/ROS/robokin/robokin_ia/lata_classifier_model.h5'
    model = tf.keras.models.load_model(model_path)

    # Ruta de la imagen que quieres probar (foto.jpg en robokin_capture_image)
    test_image_path = '/home/eduard/Escritorio/Robokin2/ROS/robokin/robokin_ia/lata3.jpg'

    # Preprocesar la imagen
    processed_image = preprocess_image(test_image_path)

    # Realizar la predicción
    predictions = model.predict(processed_image)

    # Interpretar las predicciones
    class_names = ['estrelladamm', 'heineken', 'mahou']
    predicted_class = class_names[np.argmax(predictions)]

    # Mostrar resultados
    print(f'Predicción: {predicted_class}')
    print(f'Probabilidades: Estrella Damm={predictions[0][0]}, Heineken={predictions[0][1]}, Mahou={predictions[0][2]}')


if __name__ == '__main__':
    main()