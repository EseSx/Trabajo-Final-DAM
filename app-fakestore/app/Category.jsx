// Import de Hooks
import { useEffect, useState } from "react";

// Import de componentes de React Native
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

// Import de navegación
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Category() {
  // Establecer rutas
  const router = useRouter();

  // Recibir parámetros de búsqueda
  const { category: initialCategory } = useLocalSearchParams();

  // Set el estado como nullo o como el estado atravez del cual se haya movido a la pagina
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || null
  );

  // Estado de la información recibida y de carga
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Categorías disponibles
  const categories = [
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];

  // Efecto con fetch para obtener los productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const result = await response.json();
        setData(result);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos según la categoría seleccionada
  const filteredProducts = selectedCategory
    ? data.filter((item) => item.category === selectedCategory)
    : [];

  // Mostrar indicador de carga mientras se obtienen los datos
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#006d77" />
      </View>
    );
  }

  return (
    // Contenedor principal
    <View style={{ flex: 1, backgroundColor: "#edf6f9", padding: 12 }}>
      {/* Imprimir las categorías atravez de un mapeo que les da una clave para diferenciarse */}
      <View style={styles.categoryContainer}>
        {/* "cat" no es por gato es por abreviatura de categoría */}
        {categories.map((cat) => (
          // Elemento TouchableOpacity para cada categoría
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Texto de guía para asegurarse de que se haya elegido la categoría correcta */}
      {selectedCategory && (
        <Text style={styles.sectionTitle}>
          Categoría seleccionada: {selectedCategory}
        </Text>
      )}

      {/* Lista de productos filtrados por categoría */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.card}
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
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
    justifyContent: "center",
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#d7e9f2",
  },
  categoryButtonActive: {
    backgroundColor: "#006d77",
  },
  categoryText: {
    color: "#006d77",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  categoryTextActive: {
    color: "#fff",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  cardPrice: {
    fontSize: 16,
    color: "#006d77",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#006d77",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
