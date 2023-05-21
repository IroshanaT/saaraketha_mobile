import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";

const RecomendationResult = ({ route }) => {
  const { label } = route.params;
  const [deciptionList, setDescriptionList] = useState([
    {
      id: 1,
      value: '"At405"',
      description:
        "Variety name : At 405 (Lanka Samurdhi).Year of release : 1997 .Pedigree : At 402/Basmathi 442.Average yield : 4.7 t/ha.Maturity : 120 days.Plant height : 67.0 cm.Basal leaf sheath colour : Green.Recommendation : DZ & IZ with assured supply of water",
      image: require("../../../assets/At405.png"),
    },
    {
      id: 2,
      value: '"At362"',
      description:
        "Variety name : At 362.Year of release : 2002.Pedigree : At 85-2/Bg 380.Average yield : 7.0 t/ha.Maturity : 110 days. Plant height : 70 cm.Basal leaf sheath colour : Green.Recommendation : General cultivation",
      image: require("../../../assets/At362.png"),
    },
    {
      id: 3,
      value: '"Bg352"',
      description:
        "Variety name : Bg 352.Year of release : 1992.Pedigree : Bg 380/Bg 367-4.Average yield : 4.9 t/ha.Maturity : 98 – 102 days.Plant height : 67.0 cm.Basal leaf sheath colour : Green.Recommendation : General cultivation",
      image: require("../../../assets/Bg352.png"),
    },
    {
      id: 4,
      value: '"Bg357"',
      description:
        "Variety name : Bg 357.Year of release : 1997.Pedigree : Bg 797/Bg300//85-1580/Senerang M-17.Average yield : 5.8 t/ha.Maturity : 103 – 105 days.Plant height : 56.0 cm.Basal leaf sheathcolour : Green.Recommendation : General cultivation",
      image: require("../../../assets/Bg357.png"),
    },
    {
      id: 5,
      value: '"Bg358"',
      description:
        "Variety name : Bg 358.Year of release : 1999.Pedigree : Bg 12-1/Bg1492. Average yield : 4.8 t/ha.Maturity : 103 – 105 days.Plant height : 66.0 cm.Basal leaf sheath colour : Green.Recommendation : General cultivation",
      image: require("../../../assets/Bg358.png"),
    },
    {
      id: 6,
      value: '"Bg360"',
      description:
        "Variety name : Bg 360 (Keeri samba).Year of release : 1999.Pedigree : 84-3346/IR36//Senerang.Average yield : 4.2 t/ha. Maturity : 103 – 106 days.Plant height : 52.0 cm.Basal leaf sheath colour : Green.Recommendation : General cultivation",
      image: require("../../../assets/Bg360.png"),
    },
    {
      id: 7,
      value: '"Bg379-2"',
      description:
        "Variety name : Bg 379-2(Yakada marang).Year of release : 1980.Pedigree : Bg 96-3*2/Ptb 33.Average yield : 6.1 t/ha.Maturity : 132 days.Plant height : 58.0 cm.Basal leaf sheath colour : Green.Recommendation : General cultivation",
      image: require("../../../assets/bg_379_2.png"),
    },
    {
      id: 8,
      value: '"Bg38"',
      description:
        "Variety name : Bg 38.Year of release : 1981.Pedigree : Engkatek//H 4/Podiwee A8.Average Yield : 6.0 t/ha.Maturity : 155 days-Maha*.Plant height : 84.0 cm.Basal leaf sheath colour : Green.Recommendation : Mawee land.* Photoperiod sensitive variety",
      image: require("../../../assets/Bg38.png"),
    },
    {
      id: 9,
      value: '"Bg403"',
      description:
        "Variety name : Bg 403 (Mahasen).Year of release : 1993.Pedigree : 83-1026/Bg 379-2.Average yield : 6.0 t/ha.Maturity : 118 days.Plant height : 60.0 cm.Basal leaf sheath colour : Green.Recommendation : General cultivation",
      image: require("../../../assets/Bg403.png"),
    },
    {
      id: 10,
      value: '"Bg406"',
      description:
        "Variety name : Bg 406.Year of release : 2005.Pedigree : Bg 73-797/Ptb 33/Ob 678.Maturity : 120 days.Average yield : 5.0 t/ha.Plant height : 54.0 cm.Basal leaf sheath colour : Green.Recommendation : Northern region",
      image: require("../../../assets/Bg406.png"),
    },
    {
      id: 11,
      value: '"Bg407"',
      description:
        "Variety name : Bg 407.Year of release : 1981.Pedigree : IR 5/Panduruwee.Average Yield : 5.5 t/ha.Maturity : 170 days – Maha*.Plant height : 76.0 cm.Basal leaf sheath colour : Green.Recommendation : Mawee land.* Photoperiod sensitive variety",
      image: require("../../../assets/RRDI_Bg407H_Grain-2.png"),
    },
    {
      id: 12,
      value: '"Bg409"',
      description:
        "Variety name : Bg 406.Year of release : 2005.Pedigree : Bg 73-797/Ptb 33/Ob 678.Maturity : 120 days.Average yield : 5.0 t/ha.Plant height : 54.0 cm.Basal leaf sheath colour : Green.Recommendation : Northern region",
      image: require("../../../assets/RRDI_Ld368_Grain-300x164.png"),
    },
    {
      id: 13,
      value: '"Bg450"',
      description:
        "Variety name : Bg 450.Year of release : 1985.Pedigree : Bg 12-1#2 / IR 42.Average yield : 5.3 t/ha.Maturity : 125 days.Plant height : 64.0 cm.Basal leaf sheath colour : Perpul.Recommendation : General cultivation",
      image: require("../../../assets/bg_379_2.png"),
    },
    {
      id: 14,
      value: '"Bg455"',
      description:
        "Variety name : Bg 455.Year of release : 2014.Pedigree : Ob2547/CR9413//IR46/Ob2552.Average yield : 6.0 t/ha.Maturity : 130 days.Plant height : 77.0 cm.Basal leaf sheath colour : Green.Recommendation : Flood prone area",
      image: require("../../../assets/Bg403.png"),
    },
    {
      id: 15,
      value: '"Bg745"',
      description:
        "Variety name : Bg 745.Year of release : 1981.Pedigree : 71-555/Podiwee A8.Average yield : 6.0 t/ha.Maturity : 150 days – Maha*.Plant height : 79.6 cm.Basal leaf sheath colour : Green.Recommendation : Mawee land.* Photoperiod sensitive variety",
      image: require("../../../assets/At362.png"),
    },
    {
      id: 16,
      value: '"Bg94-1"',
      description:
        "Variety name : Bg 94-1.Year of release : 1975.Pedigree : IR 262/Ld 66.Average yield : 4.1 t/ha.Maturity : 105 days.Plant height : 55.0 cm.Basal leaf sheath colour : Green.Recommendation : General cultivation",
      image: require("../../../assets/RRDI_Bg94_1_Grain.png"),
    },
    {
      id: 17,
      value: '"Bw364"',
      description:
        "Variety name : Bw 364.Year of release : 2006.Pedigree : Bw 400/OB 2552 //Bg 352.Average yield : 4.5 t/ha.Maturity : 103 days.Plant height : 104.0 cm.Basal leaf sheathcolour : Green.Recommendation : WZ, Tolerance to iron toxicity",
      image: require("../../../assets/RRDI_BW364_Grain-300x273.png"),
    },
    {
      id: 18,
      value: '"Bw367"',
      description:
        "Variety name : Bw 367.Year of release : 2011.Pedigree : Bw 361/ Bg 358.Average yield : 5.2 t/ha.Maturity : 105 days.Plant height : 97.0 cm.Basal leaf sheath colour : Green.Recommendation : General cultivation – Tolerance to iron toxicity",
      image: require("../../../assets/RRDI_BW367_Grain-300x153.png"),
    },
    {
      id: 19,
      value: '"Ld365"',
      description:
        "Variety name : Ld 365.Year of release : 2008. Pedigree : Selection of Ld 355.Average yield : 4.5 t/ha.Maturity : 102 days.Plant height : 40.0 cm.Basal leaf sheath colour : Green.Recommendation : WZ",
      image: require("../../../assets/RRDI_LD365_Grain.png"),
    },
    {
      id: 20,
      value: '"Ld368"',
      description:
        "Variety name : Ld 368.Year of release : 2011.Pedigree : Ld 4-9-11/Ld 99-17-4.Average yield : 4.6 t/ha. Maturity : 102 days.Plant height : 23.0 cm.Basal leaf sheath colour : Green. Recommendation : WZ",
      image: require("../../../assets/RRDI_Ld368_Grain-300x164.png"),
    },
    {
      id: 21,
      value: '"Ld408"',
      description:
        "Variety name : Ld 408.Year of release : 2010.Pedigree : At 01/Ld 98-152.Average yield : 5.0 t/ha.Maturity : 110 days.Plant height : 62.0 cm.Basal leaf sheath colour : GreenRecommendation : General cultivation",
      image: require("../../../assets/RRDI_Ld408_Grain.png"),
    },
  ]);
  return (
    <ImageBackground
      source={require("../../../assets/bg3.png")}
      style={styles.landing}
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>Rice Variety Recommendation</Text>
          <Text
            style={styles.label}
          >{`Recommended rice variety: ${label}`}</Text>
          {deciptionList.map((data) => {
            if (data.value === label) {
              return (
                <View key={data.id} style={styles.descriptionContainer}>
                  <Image source={data.image} style={styles.image} />
                  <Text style={styles.description}>{data.description}</Text>
                </View>
              );
            }
          })}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  landing: {
    backgroundColor: "#edebeb",
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000033",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#000",
  },
  box: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 250,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: "normal",
  },
});

export default RecomendationResult;
