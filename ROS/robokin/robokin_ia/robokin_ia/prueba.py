import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image

# Cargar el modelo entrenado
model = tf.keras.models.load_model('lata_classifier_model.h5')

# Función para cargar y preprocesar una imagen individual
def preprocess_image(image_path):
    img = image.load_img(image_path, target_size=(150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Añadir dimensión del batch
    img_array /= 255.0  # Normalizar entre 0 y 1
    return img_array

# Ruta de la imagen que quieres probar (en este caso, lata.jpg en la misma carpeta)
current_dir = os.path.dirname(os.path.abspath(__file__))
test_image_path = os.path.join(current_dir, '..', 'lata3.jpg')

# Preprocesar la imagen
processed_image = preprocess_image(test_image_path)

# Realizar la predicción
predictions = model.predict(processed_image)

# Interpretar las predicciones
class_names = ['estrelladamm', 'heineken', 'mahou']
predicted_class = class_names[np.argmax(predictions)]

# Mostrar resultados
print(f'Predicción: {predicted_class}')
print(f'Probabilidades: Estrella Damm={predictions[0][0]}, Heineken={predictions[0][1]},Mahou={predictions[0][2]}')
