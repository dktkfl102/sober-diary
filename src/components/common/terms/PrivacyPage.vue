<script setup>
const props = defineProps({
    show: Boolean,
});
const emits = defineEmits(["close"]);
</script>
<template>
    <v-bottom-sheet :model-value="props.show" scrollable persistent>
        <v-card class="rounded-t-lg !p-8 !pt-2 !shadow-none">
            <div class="flex justify-end py-2">
                <v-icon icon="mdi-close" @click="$emit('close')"></v-icon>
            </div>
            <h1 class="mb-4 text-3xl font-bold">술꾼일기 개인정보처리방침</h1>

            <section class="mb-5">
                <h2 class="text-2xl font-semibold">제1조(개인정보 수집)</h2>
                <ol class="ml-5 mt-2 list-decimal">
                    <li class="list-decimal">
                        서비스의 내용: 반려동물의 건강 데이터 기록 수집 및 관리.
                    </li>
                    <li class="list-decimal">
                        서비스 제공에 필요한 개인정보의 수집
                        <ul class="ml-8 mt-1 list-disc">
                            <li class="list-disc">필수정보: UUID</li>
                            <li class="list-disc">
                                선택정보: 이름, 비밀번호, 이메일, 반려동물 정보
                            </li>
                        </ul>
                    </li>
                    <li class="list-decimal">
                        이용자의 동의없이 민감정보를 수집하지 않습니다. 민감정보
                        수집전 앱내에서 권한을 요청하고 있으며, 이용자가 거부할
                        수 있습니다.
                    </li>
                    <li class="list-decimal">
                        위치 정보의 경우 암호화되어 DB에 안전하게 보관되며,
                        사용자가 정보 삭제시 즉시 파기됩니다.
                    </li>
                    <li class="list-decimal">
                        개인정보 수집 방법: 필수항목은 모바일 앱 프로그램을 실행
                        또는 사용함으로써 자동으로 수집되며, 선택항목은 서비스
                        가입이나 사용 중 이용자의 자발적 제공을 통해 수집됩니다.
                    </li>
                </ol>
            </section>

            <section class="mb-5">
                <h2 class="text-2xl font-semibold">
                    제2조 (개인정보의 처리 목적)
                </h2>
                <p class="mt-2">
                    '회사'는 다음의 목적을 위하여 개인정보를 처리합니다.
                    처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                    이용되지 않으며 이용 목적이 변경되는 경우에는 별도의 동의를
                    받는 등 필요한 조치를 이행할 예정입니다.
                </p>
                <ol class="ml-5 mt-2 list-decimal">
                    <li class="list-decimal">
                        서비스 회원가입 및 관리 : 회원 가입의사 확인, 회원제
                        서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리,
                        서비스 부정이용 방지, 각종 고지·통지 목적으로 개인정보를
                        처리합니다.
                    </li>
                    <li class="list-decimal">
                        재화 또는 서비스 제공 : 서비스 제공, 콘텐츠 제공,
                        맞춤서비스 제공을 목적으로 개인정보를 처리합니다.
                    </li>
                    <li class="list-decimal">
                        마케팅 및 광고에의 활용 : 이벤트 및 광고성 정보 제공 및
                        참여기회 제공 , 접속빈도 파악 또는 회원의 서비스 이용에
                        대한 통계 등을 목적으로 개인정보를 처리합니다.
                    </li>
                    <li class="list-decimal">
                        반려동물의 기타 정보 : 입력하신 반려동물의 정보는 서비스
                        개발에 활용될 수 있습니다.
                    </li>
                </ol>
            </section>

            <section class="mb-5">
                <h2 class="text-2xl font-semibold">
                    제3조 (개인정보의 처리 및 보유 기간)
                </h2>
                <ol class="ml-5 mt-2 list-decimal">
                    <li class="mt-1 list-decimal">
                        '회사'는 법령에 따른 개인정보 보유·이용기간 또는
                        정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
                        보유·이용기간 내에서 개인정보를 처리·보유합니다.
                    </li>
                    <li class="mt-1 list-decimal">
                        각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
                    </li>
                    <ul class="ml-8 mt-1 list-disc">
                        <li class="list-disc">
                            서비스 회원가입 및 관리와 관련한 개인정보는
                            수집.이용에 관한 동의일로부터지체없이 파기까지 위
                            이용목적을 위하여 보유.이용됩니다.
                        </li>
                        <li class="list-disc">
                            회원 탈퇴시 회원 정보는 일부의 정보만 파기됩니다.
                        </li>
                        <li class="list-disc">
                            예외사유 : 본인이 작성한 게시글, 댓글 등은 삭제되지
                            않습니다. 탈퇴전 직접 삭제가 가능합니다.
                        </li>
                        <li class="list-disc">
                            예외사유 : 신원을 특정할 수 없는 반려동물의 데이터는
                            삭제되지 않습니다. 탈퇴전 직접 삭제가 가능합니다.
                        </li>
                    </ul>
                </ol>
            </section>

            <section class="mb-5">
                <h2 class="text-2xl font-semibold">
                    제4조 (개인정보의 제3자 제공)
                </h2>
                <p class="mt-2">
                    회사는 정보주체의 개인정보를 본 처리방침에서 명시한 목적에
                    한해서만 처리하며, 정보주체의 사전동의가 있는 경우 또는
                    법령의 규정에 의한 경우에만 개인정보를 제3자에게 제공합니다.
                </p>
                <p class="mt-2">
                    다만, 개인정보가 필요한 이벤트에 이용자가 직접 참여하는 경우
                    개인 정보 제공을 동의하는 것으로 간주, 상품 제공을 위해 제
                    3자에게 개인정보가 제공될 수 있습니다.
                </p>
            </section>

            <section class="mb-5">
                <h2 class="text-2xl font-semibold">
                    제5조 (정보주체와 법정대리인의 권리·의무 및 그 행사방법)
                </h2>
                <ol class="ml-5 mt-2 list-decimal">
                    <li class="mt-1 list-decimal">
                        정보주체는 '회사'에 대해 언제든지 개인정보
                        열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수
                        있습니다.
                    </li>
                    <li class="mt-1 list-decimal">
                        제1항에 따른 권리 행사는 '회사'에 대해 「개인정보
                        보호법」 시행령 제41조제1항에 따라 서면, 전자우편,
                        모사전송(FAX) 등을 통하여 하실 수 있으며 '회사'는 이에
                        대해 지체 없이 조치하겠습니다.
                    </li>
                    <li class="mt-1 list-decimal">
                        제1항에 따른 권리 행사는 정보주체의 법정대리인이나
                        위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이
                        경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지
                        제11호 서식에 따른 위임장을 제출하셔야 합니다.
                    </li>
                    <li class="mt-1 list-decimal">
                        개인정보 열람 및 처리정지 요구는 「개인정보 보호법」
                        제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가
                        제한 될 수 있습니다.
                    </li>
                    <li class="mt-1 list-decimal">
                        개인정보의 정정 및 삭제 요구는 다른 법령에서 그
                        개인정보가 수집 대상으로 명시되어 있는 경우에는 그
                        삭제를 요구할 수 없습니다.
                    </li>
                    <li class="mt-1 list-decimal">
                        '회사'는 정보주체 권리에 따른 열람의 요구, 정정·삭제의
                        요구, 처리정지의 요구 시 열람 등 요구를 한 자가
                        본인이거나 정당한 대리인인지를 확인합니다.
                    </li>
                </ol>
            </section>

            <section class="mb-5">
                <h2 class="text-2xl font-semibold">제6조 (개인정보의 파기)</h2>
                <ol class="ml-5 mt-2 list-decimal">
                    <li class="mt-1 list-decimal">
                        '회사'는 개인정보 보유기간의 경과, 처리목적 달성 등
                        개인정보가 불필요하게 되었을 때에는 지체없이 해당
                        개인정보를 파기합니다.
                    </li>
                    <li class="mt-1 list-decimal">
                        개인정보 파기의 절차 및 방법은 다음과 같습니다.
                    </li>
                    <ul class="ml-8 mt-1 list-disc">
                        <li class="list-disc">
                            파기절차: '회사'는 파기 사유가 발생한 개인정보를
                            선정하고, '회사'의 개인정보 보호책임자의 승인을 받아
                            개인정보를 파기합니다.
                        </li>
                        <li class="list-disc">
                            파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수
                            없는 기술적 방법을 사용합니다.
                        </li>
                        <li class="list-disc">
                            예외: 단, 신원을 특정할 수 없는 댓글, 게시글,
                            반려동물 정보 등은 삭제되지 않으며 탈퇴 전 유저가
                            직접 삭제해야 합니다. 신원을 특정할 수 없는
                            반려동물의 데이터는 서비스 개발에 활용될 수
                            있습니다.
                        </li>
                    </ul>
                </ol>
            </section>

            <section class="mb-5">
                <h2 class="text-2xl font-semibold">
                    제7조 (개인정보의 안전성 확보 조치)
                </h2>
                <p class="mt-2">
                    '회사'는 개인정보의 안전성 확보를 위해 다음과 같은 조치를
                    취하고 있습니다.
                </p>
                <ul class="ml-8 mt-1 list-disc">
                    <li class="list-disc">내부관리계획의 수립 및 시행 :</li>
                    <li>
                        개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고
                        시행하고 있습니다.
                    </li>
                    <li class="list-disc">개인정보의 암호화 :</li>
                    <li>
                        이용자의 민감정보는 암호화 되어 저장 및 관리되고 있어,
                        본인만이 알 수 있으며 중요한 데이터는 파일 및 전송
                        데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의
                        별도 보안기능을 사용하고 있습니다.
                    </li>
                    <li class="list-disc">개인정보에 대한 접근 제한 :</li>
                    <li>
                        개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의
                        부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를
                        위하여 필요한 조치를 하고 있으며 침입차단시스템을
                        이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
                    </li>
                </ul>
            </section>

            <section class="mb-5">
                <h2 class="text-2xl font-semibold">
                    제8조 (개인정보 자동 수집 장치의 설치•운영 및 거부에 관한
                    사항)
                </h2>
                <p class="mt-2">
                    '회사'는 이용자에게 개별적인 맞춤서비스를 제공하기 위해
                    이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를
                    사용합니다.
                </p>
                <p class="mt-2">
                    쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의
                    컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC
                    컴퓨터내의 하드디스크에 저장되기도 합니다.
                </p>
                <ul class="ml-8 mt-1 list-disc">
                    <li class="list-disc">
                        쿠키의 사용 목적: 이용자가 방문한 각 서비스와 웹
                        사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속
                        여부 등을 파악하여 이용자에게 최적화된 정보 제공을 위해
                        사용됩니다.
                    </li>
                    <li class="list-disc">
                        쿠키의 설치•운영 및 거부: 웹브라우저 상단의 도구-인터넷
                        옵션-개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부
                        할 수 있습니다.
                    </li>
                    <li class="list-disc">
                        쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이
                        발생할 수 있습니다.
                    </li>
                </ul>
            </section>

            <section class="mb-5">
                <h2 class="text-2xl font-semibold">
                    제9조 (개인정보 보호책임자)
                </h2>
                <p class="mt-2">
                    '회사'는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                    개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을
                    위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                </p>
                <ul class="ml-8 mt-2 list-disc">
                    <li class="list-disc">
                        개인정보 관리 책임자: 김소연, 소속/직위: 대표, 연락처:
                        010-9966-4003
                    </li>
                    <li class="list-disc">
                        개인정보 기술 관리 책임자: 김소연, 소속/직위: 대표,
                        연락처: 010-9966-4003
                    </li>
                </ul>
                <p class="mt-2">
                    정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서
                    발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에
                    관한 사항을 개인정보 보호책임자로 문의하실 수 있습니다.
                    회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴
                    것입니다.
                </p>
            </section>

            <section class="mb-5">
                <h2 class="text-2xl font-semibold">
                    제10조 (링크 사이트에 대한 책임)
                </h2>
                <p class="mt-2">
                    '회사'는 이용자에게 다른 회사의 웹사이트 또는 자료에 대한
                    링크를 제공할 수 있습니다. 이 경우 회사는 외부 사이트 및
                    자료에 대한 아무런 통제권이 없으므로 그로부터 제공받는
                    서비스나 자료의 유용성에 대해 책임질 수 없으며 보증할 수
                    없습니다. 링크를 클릭하여 타 사이트의 페이지로 옮겨갈 경우,
                    해당 사이트의 개인정보처리방침은 회사와 무관하므로 새로
                    방문한 사이트의 정책을 검토해 보시기 바랍니다.
                </p>
            </section>

            <section class="mb-5">
                <h2 class="text-2xl font-semibold">제11조 (고지의 의무)</h2>
                <ul class="ml-8 mt-2 list-disc">
                    <li class="list-disc">
                        본 개인정보 처리방침은 시행일로부터 적용되며, 법령 및
                        방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우
                        변경사항의 시행일 7일 전부터 공지사항을 통하여
                        고지합니다.
                    </li>
                    <li class="list-disc">
                        이 개인정보처리방침은 2024년 4월 1부터 적용됩니다.
                    </li>
                </ul>
            </section>
        </v-card>
    </v-bottom-sheet>
</template>
