<script setup>
import { ref } from "vue";
// import { useToastStore } from "@/stores/toast";

const props = defineProps({
    show: Boolean,
});
// const toast = useToastStore();

const contents = ref("");
const sendSuggestion = async () => {
    if (contents.value.length < 10 || contents.value.length > 300) {
        toast.msg = "건의 사항은 10자에서 300자까지 입력이 가능해요.";
        toast.color = "red";
        toast.show = true;
        return;
    }

    // try {
    //     await ButlerService.sendSuggestion(contents.value);
    //     toast.msg = "전송이 완료되었어요! 소중한 의견 감사해요!";
    //     toast.show = true;
    //     emits("close");
    //     contents.value = "";
    // } catch (e) {
    //     if (e) {
    //         toast.msg = e;
    //     } else toast.msg = "건의사항 보내기에 실패했어요. 다시 시도해주세요.";
    //     toast.color = "red";
    //     toast.show = true;
    // }
};
const emits = defineEmits(["close"]);
</script>
<template>
    <v-dialog max-width="500" :model-value="props.show" persistent>
        <v-card rounded="lg">
            <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-xl font-semibold">의견 보내기</div>

                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="$emit('close')"
                ></v-btn>
            </v-card-title>

            <v-card-text>
                <div class="mb-2 font-semibold">내용</div>

                <v-textarea
                    :counter="300"
                    class="mb-10"
                    rows="4"
                    variant="outlined"
                    v-model="contents"
                    persistent-counter
                    max-errors="300자 까지만 입력이 가능해요"
                ></v-textarea>

                <div class="mb-2 font-semibold">
                    💌 술꾼일기 앱을 사용해주셔서 감사합니다!
                </div>
                <div class="mb-4 text-xs font-normal text-gray-400">
                    어떤 기능을 추가하거나 변경하면 좋을지,<br />또는
                    사용하시면서 불편하셨던 점이 있었다면 자유롭게 말씀해주세요.
                </div>
                <!-- 
                <v-btn
                    class="text-none font-weight-bold ms-n4"
                    color="primary"
                    text="별점 주러 가기"
                    variant="text"
                ></v-btn> -->
            </v-card-text>

            <v-card-actions class="d-flex m-2 justify-end">
                <v-btn
                    class="w-full !text-blue-500"
                    rounded="xl"
                    variant="flat"
                    @click="sendSuggestion"
                    ><span class="">전송하기</span></v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
