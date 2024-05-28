import rclpy
import cv2
import numpy as np
from cv_bridge import CvBridge, CvBridgeError
from sensor_msgs.msg import Image
from rclpy.node import Node
from rclpy.qos import ReliabilityPolicy, QoSProfile
import time
import os


class Ros2OpenCVImageConverter(Node):

    def __init__(self):
        super().__init__('Ros2OpenCVImageConverter')
        self.bridge_object = CvBridge()
        self.image_sub = self.create_subscription(Image, '/image', self.camera_callback, QoSProfile(depth=10, reliability=ReliabilityPolicy.BEST_EFFORT))
        self.test_img = None
        self.train_img = None
        self.image_received = False

    def templateMatching(self, train_img, test_img):
        # Convert both images to grayscale
        train_gray = cv2.cvtColor(train_img, cv2.COLOR_BGR2GRAY)
        test_gray = cv2.cvtColor(test_img, cv2.COLOR_BGR2GRAY)

        # Use matchTemplate to find the location of the template in the test image
        res = cv2.matchTemplate(test_gray, train_gray, cv2.TM_CCOEFF)

        # Get the best match position
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

        # Define the bounding box for the detected template
        h, w = train_gray.shape
        top_left = max_loc
        bottom_right = (top_left[0] + w, top_left[1] + h)

        return top_left, bottom_right

    def camera_callback(self, data):
        if not self.image_received:
            print("camera callback called")
            try:
                # Seleccionamos bgr8 porque es la codificacion de OpenCV por defecto
                cv_image = self.bridge_object.imgmsg_to_cv2(data, desired_encoding="bgr8")
                img2 = None
                img2 = cv_image.copy()
                imagen_desenfocada = cv2.GaussianBlur(cv_image, (5, 5), 0)
                imagen_canny = cv2.Canny(imagen_desenfocada, 50, 50)
                cv2.imwrite('imagen_canny.jpg', imagen_canny)

                # Esperar hasta que el archivo esté disponible
                # max_wait_time = 10  # Tiempo máximo de espera en segundos
                # wait_time = 0
                self.train_img=None
                self.test_img=None
                while self.train_img is None:
                    self.train_img = cv2.imread('lataPrueba.png')

                while self.test_img is None:
                    self.test_img = cv2.imread('imagen_canny.jpg')

                # Perform template matching
                top_left, bottom_right = 0, 0
                top_left, bottom_right = self.templateMatching(self.train_img, self.test_img)

                # Draw the rectangle around the matched region
                cv2.rectangle(img2, top_left, bottom_right, (0, 255, 0), 2)

                # Display the result
                cv2.imshow("Detected Template", img2)
                cv2.waitKey(0)
                cv2.destroyAllWindows()

                # Marcar que ya se recibió la imagen
                self.image_received = True

                # Cancelar la suscripción
                self.image_sub.destroy()

                quit()

            except CvBridgeError as e:
                print(e)

            #cv2.waitKey(1)


def main(args=None):
    rclpy.init(args=args)
    img_converter_object = Ros2OpenCVImageConverter()

    try:
        rclpy.spin(img_converter_object)
    except KeyboardInterrupt:
        img_converter_object.destroy_node()
        print("Fin del programa!")

    cv2.destroyAllWindows()


if __name__ == '__main__':
    main()
