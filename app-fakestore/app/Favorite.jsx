// Importo los componentes necesarios de React Native
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// Importo el hook personalizado para acceder a los favoritos
import { useFavorites } from "../Context/FavoritesContext";

// Importo el hook useRouter para la navegación
import { useRouter } from "expo-router";

export default function Favorite() {
  // Obtengo los favoritos del contexto y el router para la navegación
  const { favorites } = useFavorites();
  const router = useRouter();

  // Convierto el objeto de favoritos en un array para facilitar su manejo
  const favArray = Object.values(favorites);

  // Si no hay favoritos, muestro un mensaje indicándolo
  if (favArray.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 20 }}>No tienes favoritos aún</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Imprimo todos los objetos que sean parte de mis favoritos */}
      <FlatList
        data={favArray}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: "Product",
                params: {
                  id: item.id,
                  title: item.title,
                  img: item.image,
                  description: item.description,
                  price: item.price,
                  category: item.category,
                },
              })
            }
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Defino los estilos para los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#edf6f9",
  },

  card: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 100,
    height: 100,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#006d77",
    marginTop: 6,
  },

  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
});
