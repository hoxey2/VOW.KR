<template>
  <v-main id="main" class="bg-grey-lighten-2" height="50vh">
    <v-container>
      <v-row>
        <v-col offset="0" cols="12" offset-sm="2" sm="8" offset-lg="3" lg="6">
          <v-text-field
            class="pt-5 text-center relative"
            v-model="search_keyword"
            placeholder="닉네임을 입력해주세요."
            variant="solo"
            maxlength="50"
            @keyup.enter="[searchUser(), getData()]"
          >
            <v-btn
              class="bg-primary text-white font-weight-bold search-btn"
              size="56px"
              @click="[searchUser(), getData(), getMatchData()]"
            >
              Vow
            </v-btn>
          </v-text-field>
        </v-col>
        <v-col offset="0" cols="12" offset-sm="2" sm="8" offset-lg="3" lg="6">
          <v-card class="rounded-lg">
            <v-row class="pa-7">
              <v-col
                cols="12"
                sm="3"
                width="100px"
                class="d-flex justify-center align-center"
              >
                <div>
                  <v-img class="rounded-lg profile_img" :src="profileIconSrc" />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="d-flex flex-column justify-center align-center"
              >
                <v-card elevation="0" class="pb-3">
                  <v-card-title class="text-subtitle-1">{{
                    userData.name
                  }}</v-card-title>
                  <v-card-subtitle
                    >레벨 {{ userData.summonerLevel }}</v-card-subtitle
                  >
                  <v-card-subtitle
                    class="text-caption"
                    v-if="
                      Math.round((Date.now() - userData.revisionDate) / 1000) <
                      60
                    "
                    >업데이트
                    {{
                      Math.round((Date.now() - userData.revisionDate) / 1000)
                    }}초 전</v-card-subtitle
                  >
                  <v-card-subtitle
                    class="text-caption"
                    v-else-if="
                      Math.round(
                        (Date.now() - userData.revisionDate) / 1000 / 60
                      ) < 60
                    "
                    >업데이트
                    {{
                      Math.round(
                        (Date.now() - userData.revisionDate) / 1000 / 60
                      )
                    }}분 전</v-card-subtitle
                  >
                  <v-card-subtitle
                    class="text-caption"
                    v-else-if="
                      Math.round(
                        (Date.now() - userData.revisionDate) / 1000 / 60 / 60
                      ) < 24
                    "
                    >업데이트
                    {{
                      Math.round(
                        (Date.now() - userData.revisionDate) / 1000 / 60 / 60
                      )
                    }}시간 전</v-card-subtitle
                  >
                  <v-card-subtitle
                    class="text-caption"
                    v-else-if="
                      Math.round(
                        (Date.now() - userData.revisionDate) /
                          1000 /
                          60 /
                          60 /
                          24
                      ) < 30
                    "
                    >업데이트
                    {{
                      Math.round(
                        (Date.now() - userData.revisionDate) /
                          1000 /
                          60 /
                          60 /
                          24
                      )
                    }}일 전</v-card-subtitle
                  >
                </v-card>
              </v-col>
              <v-col
                cols="12"
                offset-sm="1"
                sm="5"
                class="d-flex flex-column justify-center align-center relative"
              >
                <v-card-title class="text-subtitle-1 font-weight-bold"
                  >솔로 랭크</v-card-title
                >
                <div class="rankImg_cut">
                  <v-img
                    class="rankImg"
                    :src="require(`@/assets/img/tier-img/${soloRankTier}.png`)"
                  ></v-img>
                </div>
                <v-card-title class="rankInfo text-subtitle-2"
                  >{{ rankData1 ? rankData1.tier : "UNRANKED" }}
                  {{ rankData1 ? rankData1.rank : "" }}</v-card-title
                >
                <v-card-subtitle
                  >{{ rankData1 ? rankData1.leaguePoints : "" }}
                  {{ rankData1 ? "점" : "_" }}</v-card-subtitle
                >
              </v-col>
              <v-col
                cols="12"
                sm="5"
                class="d-flex flex-column justify-center align-center relative"
              >
                <v-card-title class="text-subtitle-1 font-weight-bold"
                  >자유 랭크</v-card-title
                >
                <div class="rankImg_cut">
                  <v-img
                    class="rankImg"
                    :src="require(`@/assets/img/tier-img/${flexRankTier}.png`)"
                  ></v-img>
                </div>
                <v-card-title class="rankInfo text-subtitle-2"
                  >{{ rankData2 ? rankData2.tier : "UNRANKED" }}
                  {{ rankData2 ? rankData2.rank : "" }}</v-card-title
                >
                <v-card-subtitle
                  >{{ rankData2 ? rankData2.leaguePoints : "" }}
                  {{ rankData2 ? "점" : "_" }}</v-card-subtitle
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col
          v-for="match in MatchData"
          :key="match"
          offset="0"
          cols="12"
          offset-sm="2"
          sm="8"
          offset-lg="3"
          lg="6"
          class="py-1"
        >
          <v-card v-for="player in match.info.participants" :key="player">
            <div
              v-if="
                player.summonerName.toLowerCase() ==
                search_keyword.toLowerCase()
              "
            >
              <v-row v-if="player.win" class="bg-primary pa-8 border_bottom">
                <v-col
                  cols="12"
                  class="d-flex justify-space-between align-center"
                >
                  <div class="text-subtitle-1 text-white font-weight-black">
                    <v-text v-if="match.info.queueId == 420">솔로 랭크</v-text>
                    <v-text v-else-if="match.info.queueId == 430"
                      >일반 게임</v-text
                    >
                    <v-text v-else-if="match.info.queueId == 440"
                      >자유 랭크</v-text
                    >
                    <v-text v-else-if="match.info.queueId == 450"
                      >칼바람 나락</v-text
                    >
                    <v-text v-else>커스텀 모드</v-text>
                  </div>
                  <v-text
                    class="text-subtitle-1 text-grey-darken-4 font-weight-black"
                    >승리</v-text
                  >
                  <div class="text-subtitle-2 text-white">
                    <v-text
                      v-if="
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) / 1000
                        ) < 60
                      "
                      >{{
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) / 1000
                        )
                      }}초 전</v-text
                    >
                    <v-text
                      v-else-if="
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) / 1000 / 60
                        ) < 60
                      "
                      >{{
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) / 1000 / 60
                        )
                      }}분 전</v-text
                    >
                    <v-text
                      v-else-if="
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) /
                            1000 /
                            60 /
                            60
                        ) < 24
                      "
                      >{{
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) /
                            1000 /
                            60 /
                            60
                        )
                      }}시간 전</v-text
                    >
                    <v-text
                      v-else-if="
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) /
                            1000 /
                            60 /
                            60 /
                            24
                        ) < 30
                      "
                      >{{
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) /
                            1000 /
                            60 /
                            60 /
                            24
                        )
                      }}일 전</v-text
                    >
                  </div>
                </v-col>
                <v-col
                  cols="6"
                  sm="4"
                  class="d-flex flex-column justify-space-around align-start"
                >
                  <div>
                    <v-avatar size="60" class="relative">
                      <v-img
                        :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${player.championName}.png`"
                      ></v-img>
                      <v-text class="text-white text-caption absolute_level">{{
                        player.champLevel
                      }}</v-text>
                    </v-avatar>
                  </div>
                  <div class="text-caption text-secondary">
                    플레이 타임<br />
                    {{ Math.round(match.info.gameDuration / 60) }}분
                    {{ Math.round(match.info.gameDuration % 60) }}초
                  </div>
                </v-col>
                <v-col
                  cols="5"
                  sm="4"
                  class="d-flex flex-column justify-space-around align-center text-no-wrap"
                >
                  <div>
                    <v-text
                      class="ml-2 text-subtitle-1 text-secondary font-weight-bold"
                      >{{ player.kills }}&nbsp; /
                    </v-text>
                    <v-text
                      class="text-subtitle-1 text-red-darken-4 font-weight-bold"
                    >
                      &nbsp;{{ player.deaths }}&nbsp;
                    </v-text>
                    <v-text
                      class="text-subtitle-1 text-secondary font-weight-bold"
                    >
                      / {{ player.assists }}
                    </v-text>
                    <div class="text-center text-caption">
                      <v-text
                        v-if="player.deaths > 0"
                        class="text-secondary font-weight-bold ml-3"
                        >평점
                        {{
                          Math.round(
                            (player.kills + player.assists) / player.deaths
                          ).toPrecision(3)
                        }}</v-text
                      >
                      <v-text v-else class="text-secondary font-weight-bold ml-3"
                        >평점 Perfect !
                      </v-text>
                    </div>
                  </div>

                  <div class="d-flex">
                    <v-img
                      width="25"
                      :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${player.item1}.png`"
                    />
                    <v-img
                      width="25"
                      :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${player.item2}.png`"
                    />
                    <v-img
                      width="25"
                      :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${player.item3}.png`"
                    />
                    <v-img
                      width="25"
                      :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${player.item4}.png`"
                    />
                    <v-img
                      width="25"
                      :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${player.item5}.png`"
                    />
                    <v-img
                      width="25"
                      :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${player.item6}.png`"
                    />
                  </div>
                </v-col>
                <v-col cols="12" sm="4" class="text-center">
                  <v-row>
                    <v-col cols="6" class="py-0">
                      <v-list class="bg-primary">
                        <template
                          v-for="players in match.info.participants"
                          :key="players"
                        >
                          <v-list-item
                            v-if="players.teamId == 100"
                            class="d-flex justify-start pa-0"
                          >
                            <v-img
                              class="champs_img"
                              :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${players.championName}.png`"
                            >
                              <v-tooltip
                                activator="parent"
                                location="auto"
                                :text="`${players.championName}`"
                              >
                              </v-tooltip
                            ></v-img>
                            <div
                              class="text-caption text-secondary text-no-wrap overflow-hidden"
                            >
                              {{ players.summonerName }}
                            </div>
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-col>
                    <v-col cols="6" class="py-0">
                      <v-list class="bg-primary">
                        <template
                          v-for="players in match.info.participants"
                          :key="players"
                        >
                          <v-list-item
                            class="d-flex justify-start pa-0"
                            v-if="players.teamId == 200"
                          >
                            <v-img
                              class="champs_img"
                              :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${players.championName}.png`"
                            >
                              <v-tooltip
                                activator="parent"
                                location="auto"
                                :text="`${players.championName}`"
                              >
                              </v-tooltip>
                            </v-img>
                            <div
                              class="text-caption text-secondary text-no-wrap overflow-hidden"
                            >
                              {{ players.summonerName }}
                            </div>
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row v-else class="bg-red-lighten-2 pa-8">
                <v-col
                  cols="12"
                  class="d-flex justify-space-between align-center"
                >
                  <div class="text-subtitle-1 text-white font-weight-black">
                    <v-text v-if="match.info.queueId == 420">솔로 랭크</v-text>
                    <v-text v-else-if="match.info.queueId == 430"
                      >일반 게임</v-text
                    >
                    <v-text v-else-if="match.info.queueId == 440"
                      >자유 랭크</v-text
                    >
                    <v-text v-else-if="match.info.queueId == 450"
                      >칼바람 나락</v-text
                    >
                    <v-text v-else>커스텀 모드</v-text>
                  </div>
                  <v-text
                    class="text-subtitle-1 text-red-darken-4 font-weight-black"
                    >패배</v-text
                  >
                  <div class="text-subtitle-2 text-white">
                    <v-text
                      v-if="
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) / 1000
                        ) < 60
                      "
                      >{{
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) / 1000
                        )
                      }}초 전</v-text
                    >
                    <v-text
                      v-else-if="
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) / 1000 / 60
                        ) < 60
                      "
                      >{{
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) / 1000 / 60
                        )
                      }}분 전</v-text
                    >
                    <v-text
                      v-else-if="
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) /
                            1000 /
                            60 /
                            60
                        ) < 24
                      "
                      >{{
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) /
                            1000 /
                            60 /
                            60
                        )
                      }}시간 전</v-text
                    >
                    <v-text
                      v-else-if="
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) /
                            1000 /
                            60 /
                            60 /
                            24
                        ) < 30
                      "
                      >{{
                        Math.round(
                          (Date.now() - match.info.gameEndTimestamp) /
                            1000 /
                            60 /
                            60 /
                            24
                        )
                      }}일 전</v-text
                    >
                  </div>
                </v-col>
                <v-col
                  cols="6"
                  sm="4"
                  class="d-flex flex-column justify-space-around"
                >
                  <div>
                    <v-avatar size="60" class="relative">
                      <v-img
                        :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${player.championName}.png`"
                      ></v-img>
                      <v-text class="text-white text-caption absolute_level">{{
                        player.champLevel
                      }}</v-text>
                    </v-avatar>
                  </div>
                  <div class="text-caption text-secondary">
                    플레이 타임<br />
                    {{ Math.round(match.info.gameDuration / 60) }}분
                    {{ Math.round(match.info.gameDuration % 60) }}초
                  </div>
                </v-col>
                <v-col
                  cols="5"
                  sm="4"
                  class="d-flex flex-column justify-space-around align-center text-no-wrap"
                >
                  <div>
                    <v-text
                      class="ml-2 text-subtitle-1 text-secondary font-weight-bold"
                      >{{ player.kills }}&nbsp; /
                    </v-text>
                    <v-text
                      class="text-subtitle-1 text-red-darken-2 font-weight-bold"
                    >
                      &nbsp;{{ player.deaths }}&nbsp;
                    </v-text>
                    <v-text
                      class="text-subtitle-1 text-secondary font-weight-bold"
                    >
                      / {{ player.assists }}
                    </v-text>
                    <div class="text-center text-caption">
                      <v-text
                        v-if="player.deaths > 0"
                        class="text-secondary font-weight-bold ml-3"
                        >평점
                        {{
                          Math.round(
                            (player.kills + player.assists) / player.deaths
                          ).toPrecision(3)
                        }}</v-text
                      >
                      <v-text v-else class="text-secondary ml-3"
                        >평점 Perfect
                      </v-text>
                    </div>
                  </div>

                  <div class="d-flex">
                    <v-img
                      width="25"
                      :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${player.item1}.png`"
                    />
                    <v-img
                      width="25"
                      :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${player.item2}.png`"
                    />
                    <v-img
                      width="25"
                      :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${player.item3}.png`"
                    />
                    <v-img
                      width="25"
                      :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${player.item4}.png`"
                    />
                    <v-img
                      width="25"
                      :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${player.item5}.png`"
                    />
                    <v-img
                      width="25"
                      :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${player.item6}.png`"
                    />
                  </div>
                </v-col>
                <v-col cols="12" sm="4" class="text-center">
                  <v-row>
                    <v-col cols="6" class="py-0">
                      <v-list class="bg-red-lighten-2">
                        <template
                          v-for="players in match.info.participants"
                          :key="players"
                        >
                          <v-list-item
                            v-if="players.teamId == 100"
                            class="d-flex justify-start pa-0"
                          >
                            <v-img
                              class="champs_img"
                              :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${players.championName}.png`"
                            >
                              <v-tooltip
                                activator="parent"
                                location="auto"
                                :text="`${players.championName}`"
                              >
                              </v-tooltip
                            ></v-img>
                            <v-text
                              class="text-caption text-secondary text-no-wrap"
                              >{{ players.summonerName }}</v-text
                            >
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-col>
                    <v-col cols="6" class="py-0">
                      <v-list class="bg-red-lighten-2">
                        <template
                          v-for="players in match.info.participants"
                          :key="players"
                        >
                          <v-list-item
                            class="d-flex justify-start pa-0"
                            v-if="players.teamId == 200"
                          >
                            <v-img
                              class="champs_img"
                              :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${players.championName}.png`"
                            >
                              <v-tooltip
                                activator="parent"
                                location="auto"
                                :text="`${players.championName}`"
                              >
                              </v-tooltip>
                            </v-img>
                            <div
                              class="text-caption text-secondary text-no-wrap overflow-hidden"
                            >
                              {{ players.summonerName }}
                            </div>
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="pt-10">
        <v-col offset='4' cols="4">
          <v-btn width="100%" class="text-center bg-primary"
          @click="[countUp(), getData()]">더보기</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script setup>
import axios from "axios";
import { ref, reactive, computed, onUpdated } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
const API_KEY = computed(() => store.state.API_KEY);
const queryId = route.query.nickname;
if (queryId) {
  store.commit("setKeyword", route.query.nickname);
}
const search_keyword = ref(store.getters.getKeyword),
  userData = ref("유저 데이터"),
  rankData1 = ref("랭크 데이터1"),
  rankData2 = ref("랭크 데이터2");
let soloRankTier = ref("iron");
let flexRankTier = ref("iron");
let MatchId = ref("");
let MatchData = reactive([]);
let count = 5;

getData();

function countUp(){
  count += 5;
  // console.log(count)
}

// 프로필 이미지 경로
let profileIconSrc = ref("");

/** 소환사 기본 정보(프로필) 가져오기 */
// 콘솔 유저 데이터 출력
function getData() {
  getSummonerData().then((data) => {
    getRankData(data);
    getMatchId(data).then((data) => {
      getMatchData(data);
    });
  });
}

/** 프로필 조회정보 가져오기 기능 + 프로필 정보 삽입 */
async function getSummonerData() {
  let APIUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${search_keyword.value}?api_key=${API_KEY.value}`;
  let APIUrl_enc = encodeURI(APIUrl);
  let result = await axios.get(APIUrl_enc);
  userData.value = result.data;
  profileIconSrc.value = `http://ddragon.leagueoflegends.com/cdn/13.13.1/img/profileicon/${userData.value.profileIconId}.png`;

  return result.data;
}

/** userData에서 받은 id로 rankData 가져오기 + 이미지 이름 삽입 */
async function getRankData(data) {
  let APIUrl = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.id}?api_key=${API_KEY.value}`;
  let APIUrl_enc = encodeURI(APIUrl);
  let result = await axios.get(APIUrl_enc);
  rankData1.value = result.data.filter(
    (val) => val.queueType === "RANKED_SOLO_5x5"
  )[0];
  rankData2.value = result.data.filter(
    (val) => val.queueType === "RANKED_FLEX_SR"
  )[0];
  soloRankTier.value = rankData1.value?.tier
    ? rankData1.value?.tier.toLowerCase()
    : "iron";
  flexRankTier.value = rankData2.value?.tier
    ? rankData2.value?.tier.toLowerCase()
    : "iron";
}

/** MatId 데이터 가져오기 */
async function getMatchId(data) {
  let result = await axios.get(
    `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${data.puuid}/ids?start=0&count=${count}&api_key=${API_KEY.value}`
  );
  MatchId.value = result.data;
  return result.data;
}

/** MatchData 가져오기 */
async function getMatchData(data) {
  // 데이터 초기화
  MatchData.length = 0;
  for (let i = 0; i < data.length; i++) {
    let result = await axios.get(
      `https://asia.api.riotgames.com/lol/match/v5/matches/${data[i]}?api_key=${API_KEY.value}`
    );
    MatchData.push(result.data);
  }
}

/** store에 keyword넣기 + router search로 이동 */
let searchUser = () => {
  store.commit("setKeyword", search_keyword);
  router.push({
    path: "/search",
    query: { nickname: search_keyword.value },
  });
};
</script>
<style lang="sass">
@import "@/assets/css/common.sass"
.profile_img
  width: 4.6rem
  height: 4.6rem
.rankImg_cut
  width: 6rem
  height: 6rem
  overflow: hidden
.rankImg
  scale: 3.0
.rankInfo
  position: absolute
  top: 7.0rem
.absolute_level
  width: 18px
  height: 18px
  position: absolute
  background: rgba(0,0,0,0.6)
  border-radius: 25%
  bottom: 3px
.champs_img
  width: 25px
  height: 25px
</style>