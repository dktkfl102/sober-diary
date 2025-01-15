export default class BottomSheetContents {
    static CHANGE_CHALLENGE_STATUS = {
        name: "CHANGE_CHALLENGE_STATUS",
        title: "챌린지 상태 변경",
        btnList: [
            {
                title: "성공",
                content: "와 정말 멋져요!",
                icon: "check",
                resoponse: true,
            },
            {
                title: "실패",
                content: "괜찮아요. 다음에 또 도전하면 돼요!",
                icon: "cancel",
                resoponse: false,
            },
        ],
    };

    static CHECK_SMOKING_STATUS = {
        name: "CHECK_SMOKING_STATUS",
        title: "반가워요!<br />흡연 유무도 같이 관리하시겠어요?",
        btnList: [
            {
                title: "좋아요",
                content: "금연 챌린지도 함께 할 수 있어요",
                icon: "smoking",
                resoponse: true,
            },
            {
                title: "필요 없어요",
                content: "설정 화면에서 다시 선택 할 수 있어요",
                icon: "smoking-off",
                resoponse: false,
            },
        ],
    };

    static INITIALIZE_APP_DATA = {
        name: "INITIALIZE_APP_DATA",
        title: "정말 초기화 하시겠어요?",
        btnList: [
            {
                title: "네",
                content: "모든 데이터가 삭제되어 복구 할 수 없어요",
                icon: "check",
                resoponse: true,
            },
            {
                title: "아니요",
                content: "좋아요! 기록을 계속 이어가봐요",
                icon: "cancel",
                resoponse: false,
            },
        ],
    };
}
