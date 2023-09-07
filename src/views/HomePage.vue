<template>
  <v-main id="main" class="bg-grey-lighten-2" height="50vh">
    <v-container>
      <v-alert 
        color="warning"
        icon="$warning"
        text="닉네임을 입력해주세요"
        v-show="alertShown"
        :style="{position: 'absolute', top: '170px', left: '50%', transform: 'translate(-50%,0)' ,zIndex: 1000}"
        />
      <v-row>
        <v-col offset="0" cols="12" offset-sm="2" sm="8" offset-lg="3" lg="6">
          <v-text-field
            class="pt-5 text-center relative"
            v-model="search_keyword"
            placeholder="밑에 예시를 클릭하면 입력됩니다."
            variant="solo"
            maxlength="50"
            @keyup.enter="searchUser"
          >
            <v-btn
              class="bg-primary text-white font-weight-bold search-btn"
              size="56px"
              @click="search_keyword ? searchUser() : alertForNull()"
            >
              VOW
            </v-btn>
          </v-text-field>
        </v-col>
        <v-col class="text-caption text-center text-grey top-minus" cols="12">
          <span v-for="pro in skt_pros" :key="pro" class="add-cursor">
            <v-text @click="changeKeyword(pro)"> {{ pro }} </v-text>,
          </span>
        </v-col>
        <!-- 롤 신챔 나피리 소개 영상 -->
        <v-col
          cols="12"
          class="text-center text-subtitle-1 font-weight-black pt-3 mb-5"
          >{ 신챔 나피리 소개 영상 🕶 }</v-col
        >
        <v-col offset="0" cols="12" offset-sm="2" sm="8" offset-lg="3" lg="6">
          <v-card class="text-center video-wrap">
            <iframe
              width="895"
              height="503"
              src="https://www.youtube.com/embed/5iAAkE_-olU"
              title="롤 신챔프 나피리 시네마틱 트레일러 영상"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </v-card>
        </v-col>
        <v-col
          offset="0"
          cols="12"
          offset-lg="2"
          lg="4"
          offset-sm="0"
          sm="6"
          class="py-5"
        >
          <v-sheet rounded="lg" elevation="1" height="402px" class="relative">
            <v-list rounded="lg">
              <v-list-item-title
                class="text-subtitle-1 text-secondary px-5 py-5"
                >이번주 인기글 🎉</v-list-item-title
              >
              <v-list-item v-for="n in 6" :key="n" link>
                <v-list-item-title
                  class="text-subtitle-2 text-dark font-weight-medium"
                >
                  글 샘플 제목 {{ n }}
                </v-list-item-title>
                <v-divider></v-divider>
              </v-list-item>
            </v-list>
            <v-btn class="absolute-top" color="primary" size="x-small" flat
              >더보기</v-btn
            >
          </v-sheet>
        </v-col>
        <v-col
          offset="0"
          cols="12"
          lg="4"
          offset-sm="0"
          sm="6"
          class="py-5 relative"
        >
          <v-card elevation="1">
            <v-card-title class="text-subtitle-1 px-5 py-5">
              챔피언 소개 📃
            </v-card-title>
            <v-row class="d-flex flex-row justify-space-around">
              <v-col
                cols="3"
                elevation="0"
                class="d-flex flex-column align-center justify-center add-cursor"
                v-for="(champ, index) in champs_en"
                :key="index"
              >
                <v-avatar size="50px" rounded="circle">
                  <v-img
                    cover
                    :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${champ}.png`"
                  ></v-img>
                </v-avatar>
                <v-text class="text-caption text-no-wrap my-3">
                  {{ champ }}
                </v-text>
              </v-col>
            </v-row>
            <v-btn flat class="absolute-top" color="primary" size="x-small"
              >더보기</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import axios from "axios";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const store = useStore();
const router = useRouter();
const route = useRoute();
let alertShown = ref(false)
let search_keyword = ref(""),
  champs_en = [
    "Garen",
    "Galio",
    "Gangplank",
    "Gragas",
    "Graves",
    "Nami",
    "Nasus",
    "Nautilus",
    "Nocturne",
    "Nunu",
    "Nidalee",
    "Darius",
  ],
  /** 검색 키워드 예시 */
  skt_pros = ["T1 Zeus", "아 니 맞나", "hide on bush", "T1 Gumayusi", "역천괴"];
function changeKeyword(pro) {
  this.search_keyword = pro;
}
/** 로테이션 정보 가져오기 */
// Riot API key (s)
const API_KEY = computed(() => store.state.API_KEY),
  // API request URL
  ApiUrl = `https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${API_KEY.value}`;

/** store에 keyword넣기 + router search로 이동 */
let searchUser = (query) => {
  store.commit("setKeyword", search_keyword);
  router.push({
    path: "/search",
    query: { nickname: search_keyword.value },
  });
};
const toggleAlert = () => {
  alertShown.value = !alertShown.value
}
const alertForNull = () => {
  setTimeout(toggleAlert, 1000);
  toggleAlert();
}

/** 로테이션 챔피언 번호 가져오기 */
function getRoationChampsData() {
  return axios.get(ApiUrl);
}
/** 챔피언 전체 정보 가져오기 */
function getChampsData_US() {
  return axios.get(
    "http://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/champion.json"
  );
}
axios.all([getRoationChampsData(), getChampsData_US()]).then(
  axios.spread(function (rot, all) {
    let freeChampsIds = rot.data.freeChampionIds;
    let allChampsData = all.data.data;
  })
);
</script>

<style lang="sass">
@import "@/assets/css/common.sass"
.video-wrap
  position: relative
  padding-top: 56%
  margin-top: -20px
  width: 100%
  height: fit-content
.video-wrap > iframe
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
</style>
