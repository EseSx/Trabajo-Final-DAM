// Importo los componentes necesarios de React Native
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";

// Importo el hook para obtener los parámetros de búsqueda
import { useLocalSearchParams } from "expo-router";

// Importo los iconos necesarios
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

// Importo el contexto de favoritos
import { useFavorites } from "../Context/FavoritesContext";

// Importo el hook para la navegación
import { useRouter } from "expo-router";

// Importo el hook para manejar las áreas seguras en dispositivos con notch
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Product() {
  // Contexto de favoritos
  const { favorites, toggleFavorite } = useFavorites();

  // Hook para la navegación
  const router = useRouter();

  // Hook para obtener los parámetros de búsqueda
  const { id, title, img, description, price, category } =
    useLocalSearchParams();

  // Creo el objeto del producto
  const item = {
    id: Number(id),
    title,
    image: img,
    description,
    price,
    category,
  };

  // Obtengo las dimensiones de la pantalla
  const screenHeight = Dimensions.get("window").height;

  // Calculo la altura de la sección superior
  const topHeight = screenHeight * 0.25;

  // Hook para manejar las áreas seguras
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Creo el boton para añadir a favoritos */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id, item)}
        >
          <MaterialIcon
            name={favorites[item.id] ? "star" : "star-outline"}
            size={26}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Añado la imagen entre medio de ambas secciones */}
        <View style={[styles.topSection, { height: topHeight }]}>
          <View style={styles.imageCard}>
            <Image source={{ uri: img }} style={styles.imageInsideCard} />
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price}</Text>

          {/* Añado un boton de categoría */}
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() =>
              router.push({
                pathname: "Category",
                params: { category: item.category },
              })
            }
          >
            <Text style={styles.categoryText}>{item.category}</Text>
          </TouchableOpacity>

          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>

      {/* Añado un boton para comprar */}
      <View style={[styles.buyContainer, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => Alert.alert("Comprado")}
        >
          <Text style={styles.buyText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  favoriteButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 50,
    backgroundColor: "#006d77",
    padding: 10,
    borderRadius: 50,
    elevation: 4,
  },

  topSection: {
    backgroundColor: "#006d77",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 80,
    position: "relative",
  },

  imageCard: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 18,
    padding: 15,
    alignItems: "center",
    elevation: 5,
    position: "absolute",
    bottom: -60,
    zIndex: 30,
  },

  bottomSection: {
    backgroundColor: "#edf6f9",
    padding: 20,
    paddingTop: 80,
    minHeight: 300,
  },

  categoryButton: {
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: "#83c5be",
    borderRadius: 20,
    marginBottom: 15,
  },

  categoryText: {
    color: "#006d77",
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  imageInsideCard: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#006d77",
    textAlign: "center",
    marginVertical: 10,
  },

  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
  },

  buyContainer: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },

  buyButton: {
    backgroundColor: "#f5af34",
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buyText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
