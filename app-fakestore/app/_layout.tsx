// Importo Stack para manejar la navegación entre pantallas
import { Stack } from "expo-router";

// Importo componentes de React Native para construir la interfaz de usuario
import { View, Text, Image } from "react-native";

// Importo el proveedor de contexto para manejar los favoritos en la aplicación
import { FavoritesProvider } from "../Context/FavoritesContext";

export default function RootLayout() {
  return (
    // Envuelvo la aplicación con el proveedor de favoritos para compartir el estado entre componentes
    <FavoritesProvider> 

      {/* Stack define la navegación por pantallas apiladas */}
      <Stack>

        {/* Cada <Stack.Screen> es una de las diversas pantallas del sistema */}
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Image
                  source={require("../assets/icons/CarCrash.png")}
                  style={{ width: 40, height: 40 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 30, color: "#d7e9f2" }}>
                  CarritoLoco
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "#006d77" },
            animation: "slide_from_right",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="Favorite"
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../assets/icons/CarCrash.png")}
                    style={{ width: 40, height: 40, marginRight: 8 }}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 28,
                      color: "#d7e9f2",
                    }}
                  >
                    CarritoLoco
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#d7e9f2",
                    marginLeft: 48,
                    marginTop: -4,
                  }}
                >
                  Favoritos
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "#006d77" },
            animation: "slide_from_right",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="Category"
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../assets/icons/CarCrash.png")}
                    style={{ width: 40, height: 40, marginRight: 8 }}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 28,
                      color: "#d7e9f2",
                    }}
                  >
                    CarritoLoco
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#d7e9f2",
                    marginLeft: 48,
                    marginTop: -4,
                  }}
                >
                  Categorías
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "#006d77" },
            animation: "slide_from_right",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="Search"
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../assets/icons/CarCrash.png")}
                    style={{ width: 40, height: 40, marginRight: 8 }}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 28,
                      color: "#d7e9f2",
                    }}
                  >
                    CarritoLoco
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#d7e9f2",
                    marginLeft: 48,
                    marginTop: -4,
                  }}
                >
                  Buscar
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "#006d77" },
            animation: "slide_from_right",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="Product"
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../assets/icons/CarCrash.png")}
                  style={{ width: 40, height: 40, marginRight: 8 }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 28,
                    color: "#d7e9f2",
                  }}
                >
                  CarritoLoco
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "#006d77" },
            animation: "fade_from_bottom",
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </FavoritesProvider>
  );
}
