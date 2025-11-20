// Importo los componentes necesarios de React Native
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// Importo los hooks necesarios de React
import { useEffect, useState } from "react";

// Importo los iconos necesarios
import Icon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

// Importo el hook para manejar las áreas seguras en dispositivos con notch
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Importo el hook para la navegación
import { useRouter } from "expo-router";

// Importo el contexto de favoritos
import { useFavorites } from "../Context/FavoritesContext";

// Importo los estilos globales (Que al final no uso)
import "../global.css";

export default function Index() {
  // Estado para manejar los datos de los productos
  const [data, setData] = useState([]);

  // Estado pra manejar los datos visibles (paginación)
  const [visibleData, setVisibleData] = useState([]);

  // Estados para manejar la carga y mostrar mas productos
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Estado para manejar la paginación
  const [page, setPage] = useState(1);

  // Estado para manejar errores
  const [error, setError] = useState(null);

  // Estado para manejar el input de búsqueda
  const [input, setInput] = useState("");

  // Contexto de favoritos
  const { favorites, toggleFavorite } = useFavorites();

  // Hook para manejar las áreas seguras
  const insets = useSafeAreaInsets();

  // Hook para la navegación
  const router = useRouter();

  // Número de ítems por página
  const itemsPerPage = 5;

  // Efecto para obtener los datos de la API al montar el componente
  useEffect(() => {
    const fetchFakeStoreData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Error en la solicitud");

        const result = await response.json();
        setData(result);
        setVisibleData(result.slice(0, itemsPerPage));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFakeStoreData();
  }, []);

  // Función para manejar la carga de más productos al llegar al final de la lista
  const handleLoadMore = () => {
    if (loadingMore) return;

    // Si ya se han cargado todos los productos, no hacer nada
    setLoadingMore(true);

    // Calculo la siguiente página
    const nextPage = page + 1;

    // Calculo los índices de los nuevos productos a cargar
    const start = (nextPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Los nuevos productos que se van a recibir
    const newItems = data.slice(start, end);

    // Simulo un retardo para la carga
    setTimeout(() => {
      setVisibleData((prev) => [...prev, ...newItems]);
      setPage(nextPage);
      setLoadingMore(false);
    }, 500);
  };

  // Filtrado de datos basado en el input de búsqueda
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(input.toLowerCase())
  );

  // Datos a mostrar: si hay input, muestro los datos filtrados, si no, los visibles
  const displayedData = input.length > 0 ? filteredData : visibleData;

  // Renderizado condicional basado en el estado de carga y errores
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  // Función para renderizar cada ítem de la lista
  const renderItem = ({ item }) => (
    // Cada tarjeta de producto
    <TouchableOpacity
      activeOpacity={1}
      style={{ width: "48%" }}
      // Navegación al detalle del producto con sus parámetros
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
      <View style={styles.card}>
        {/* Boton de favorito */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id, item)}
        >
          <MaterialIcon
            name={favorites[item.id] ? "star" : "star-outline"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: 150 }}
          resizeMode="contain"
        />

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>

        {/* Boton de categoría */}
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() =>
            router.push({
              pathname: "Category",
              params: { category: item.category },
            })
          }
        >
          <Text style={styles.categoryButtonText}>{item.category}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      {/* Input de búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon
            name="search"
            size={22}
            color="#a1bfe6"
            style={{ marginRight: 8 }}
          />

          <TextInput
            placeholder="Buscar producto..."
            value={input}
            onChangeText={setInput}
            placeholderTextColor="#a1bfe6"
            style={styles.searchInput}
          />

          {input.length > 0 && (
            <TouchableOpacity onPress={() => setInput("")}>
              <Icon
                name="x"
                size={22}
                color="#a1bfe6"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Renderizado de los productos recibidos */}
      <FlatList
        data={displayedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
        contentContainerStyle={{ padding: 15, paddingBottom: 80 }}
        onEndReached={handleLoadMore} // Cargar más al llegar al final
        onEndReachedThreshold={0.5} // Umbral para activar la carga
        ListFooterComponent={
          loadingMore && <ActivityIndicator size="small" color="#0000ff" />
        } // Indicador de carga al final
      />

      {/* Barra de navegación inferior */}
      <View style={[styles.navBar, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity
          onPress={() => router.navigate("/")}
          style={styles.navItem}
        >
          <MaterialIcon name="home" size={30} color="#d7e9f2" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.navigate("Favorite")}
          style={styles.navItem}
        >
          <MaterialIcon name="star" size={30} color="#d7e9f2" />
          <Text style={styles.navText}>Favoritos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.navigate("Category")}
          style={styles.navItem}
        >
          <MaterialIcon name="view-grid" size={30} color="#d7e9f2" />
          <Text style={styles.navText}>Categoría</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.navigate("Search")}
          style={styles.navItem}
        >
          <MaterialIcon name="magnify" size={30} color="#d7e9f2" />
          <Text style={styles.navText}>Buscar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: "#edf6f9",
  },

  searchContainer: {
    backgroundColor: "#006d77",
    width: "100%",
    height: "10%",
    padding: 15,
    justifyContent: "center",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d7e9f2",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#a1bfe6",
    paddingHorizontal: 10,
  },

  searchInput: {
    flex: 1,
    color: "#000",
    fontSize: 16,
    paddingVertical: 8,
  },

  card: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: "relative",
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },

  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#006d77",
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#006d77",
    marginTop: 6,
  },

  categoryButton: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#d7e9f2",
    borderRadius: 12,
  },

  categoryButtonText: {
    textTransform: "capitalize",
    color: "#006d77",
    fontWeight: "bold",
    textAlign: "center",
  },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#006d77",
    paddingVertical: 10,
  },

  navItem: {
    alignItems: "center",
  },

  navText: {
    color: "#d7e9f2",
    fontSize: 14,
  },
});
