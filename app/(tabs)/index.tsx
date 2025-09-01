import React from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type Product = { name: string; description: string; price: number; image: string };

function formatBRL(v: number) {
  try {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  } catch {
    return `R$ ${Number(v).toFixed(2)}`.replace(".", ",");
  }
}

function ProductCard({ item, cardWidth }: { item: Product; cardWidth: number }) {
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image
        source={{ uri: item.image }}
        style={styles.cover}
        resizeMode="cover"
      />

      <Text style={styles.title} numberOfLines={2}>
        {item.name}
      </Text>

      <Text style={styles.desc} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.row}>
        <Text style={styles.price}>{formatBRL(item.price)}</Text>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() => Alert.alert("Adicionado", `Added: ${item.name}`)}
        >
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Index() {

  const products: Product[] = [
    {
      name: "Pizza de calabresa com cebola caramelizada",
      description:
        "Pizza G, com molho de tomate, queijo mussarela e cebola caramelizada.",
      price: 70,
      image:
        "https://uploads.metroimg.com/wp-content/uploads/2021/12/14161021/Calabresa-Caramelizada-com-molho-de-tomate-mucarela-linguica-calabresa-fatiada-cebola-caramelizada-azeitonas-pretas-e-oregano.jpeg",
    },
    {
      name: "Batata frita com cheedar e bacon",
      description: "Porção média com cheddar e bacon.",
      price: 15,
      image:
        "https://softpig.com.br/wp-content/uploads/2023/10/Batata-frita-com-cheddar-e-bacon-Receita-softpig.jpg",
    },
    {
      name: "Morango do Amor",
      description: "Morango com brigadeiro branco e calda caramelizada.",
      price: 20,
      image:
        "https://canaldareceita.com.br/wp-content/uploads/2025/08/Design-sem-nome-3.webp",
    },
  ];


  const { width } = useWindowDimensions();
  const maxWidth = 1200;              
  const columns = 2;
  const horizontalPadding = 16;
  const gap = 12;
  const containerWidth = Math.min(width, maxWidth);
  const cardWidth = (containerWidth - horizontalPadding * 2 - gap) / columns;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>🍔 Cardápio</Text>

      <FlatList
        data={products}
        keyExtractor={(item, i) => `${item.name}-${i}`}
        numColumns={columns}
        columnWrapperStyle={{ gap }}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingBottom: 24,
          gap,
          alignSelf: "center",     
          width: containerWidth,   
        }}
        renderItem={({ item }) => (
          <ProductCard item={item} cardWidth={cardWidth} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  header: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    marginVertical: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    // sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    
    elevation: 3,
  },

  cover: {
    width: "100%",
    aspectRatio: 16 / 9, 
    borderRadius: 12,
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: "700" },
  desc: { color: "#6b7280", fontSize: 13, marginTop: 2, minHeight: 34 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: { fontWeight: "800", fontSize: 16 },
  btn: { borderRadius: 8, backgroundColor: "#22c55e", paddingVertical: 6, paddingHorizontal: 14 },
  btnText: { fontWeight: "700", color: "#000" },
});
