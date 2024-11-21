<script setup>
import { reactive } from "vue";

const show = defineModel("show", { type: Boolean });
const emits = defineEmits(["close"]);

const challengeData = reactive({
    type: 1, // TODO 챌린지 타입 API로 받아오기
    name: "",
    category: "금주", // 마찬가지 -> API로 받아서 store에 넣어놓기 & 로컬스토리지 검사해서 금주 숨겨놨을 경우 금주안가져오기
    startDate: "",
    duration: "",
    memo: "",
});
</script>
<template>
    <v-bottom-sheet v-model="show" max-width="500" class="font-pretendard">
        <v-card class="rounded-t-xl bg-gray-800 px-6 py-4 text-white">
            <div class="mb-4 text-center text-xl font-semibold">
                새로운 챌린지 추가
            </div>
            <v-divider class="mb-4"></v-divider>

            <!-- Challenge Type Radio Buttons -->
            <div class="mb-4">
                <v-radio-group v-model="challengeData.type">
                    <v-radio label="기간 타입" :value="1" color="primary" />
                    <v-radio label="개인 타입" :value="2" color="primary" />
                </v-radio-group>
            </div>

            <v-select
                v-model="challengeData.category"
                :items="['금연', '금주']"
                label="카테고리"
                variant="underlined"
                class="mb-4"
                placeholder="카테고리를 선택하세요"
            ></v-select>

            <v-text-field
                v-if="challengeData.type === 2"
                v-model="challengeData.name"
                label="챌린지명"
                variant="underlined"
                class="mb-4"
                :placeholder="
                    challengeData.type === 1
                        ? '회식 날 술 안 먹기'
                        : '술 마실 때 줄담배 안 피기'
                "
            ></v-text-field>

            <v-menu
                ref="startDateMenu"
                v-model="startDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
                <template #activator="{ on, attrs }">
                    <v-text-field
                        v-model="challengeData.startDate"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        class="mb-4"
                        :placeholder="
                            challengeData.type === 1
                                ? '챌린지 시작일을 선택하세요'
                                : '챌린지 날짜를 선택하세요'
                        "
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="challengeData.startDate"
                    @input="startDateMenu = false"
                ></v-date-picker>
            </v-menu>

            <v-text-field
                v-if="challengeData.type === 1"
                v-model="challengeData.duration"
                label="목표 일 수"
                variant="underlined"
                class="mb-4"
                type="number"
                min="1"
                placeholder="목표 기간을 입력하세요"
            ></v-text-field>

            <v-textarea
                v-model="challengeData.memo"
                label="메모"
                variant="underlined"
                rows="2"
                class="mb-4"
                placeholder="메모를 입력하세요"
            ></v-textarea>

            <div class="flex justify-end">
                <v-btn text color="gray" @click="show = false">취소</v-btn>
                <v-btn color="primary">추가하기</v-btn>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>
