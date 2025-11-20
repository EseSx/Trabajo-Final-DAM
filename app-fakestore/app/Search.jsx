// Hooks de React
import { useEffect, useState } from "react";

// Componentes de React Native
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

// Iconos
import Icon from "react-native-vector-icons/Feather";

// Navegación
import { useRouter } from "expo-router";

export default function Search() {
  // router para navegación
  const router = useRouter();

  // Productos obtenidos de la API
  const [products, setProducts] = useState([]);

  // Estado de la consulta de búsqueda
  const [query, setQuery] = useState("");

  // Estado del filtro seleccionado
  const [filter, setFilter] = useState("title");

  // Obtener productos desde la API al montar el componente
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  // Filtrar productos según la consulta y el filtro seleccionado
  const filtered = products.filter((p) => {
    const q = query.toLowerCase();

    if (filter === "price") return p.price.toString().includes(q);
    if (filter === "description")
      return p.description.toLowerCase().includes(q);

    return p.title.toLowerCase().includes(q);
  });

  return (
    <View style={styles.container}>
      {/* Sección de filtros */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, filter === "title" && styles.filterActive]}
          onPress={() => setFilter("title")}
        >
          <Text style={styles.filterText}>Título</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === "price" && styles.filterActive]}
          onPress={() => setFilter("price")}
        >
          <Text style={styles.filterText}>Precio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            filter === "description" && styles.filterActive,
          ]}
          onPress={() => setFilter("description")}
        >
          <Text style={styles.filterText}>Descripción</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchBar}>
        <Icon
          name="search"
          size={22}
          color="#a1bfe6"
          style={{ marginRight: 8 }}
        />

        <TextInput
          placeholder="Buscar producto..."
          value={query}
          onChangeText={setQuery}
          placeholderTextColor="#a1bfe6"
          style={styles.input}
        />

        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Icon
              name="x"
              size={22}
              color="#a1bfe6"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Lista de productos filtrados */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 15 }}
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
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#edf6f9",
    padding: 15,
  },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#83c5be",
    borderRadius: 20,
  },

  filterActive: {
    backgroundColor: "#006d77",
  },

  filterText: {
    color: "white",
    fontWeight: "bold",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d7e9f2",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#a1bfe6",
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    color: "#000",
    fontSize: 16,
    paddingVertical: 8,
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

  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#006d77",
    marginTop: 6,
  },
});
