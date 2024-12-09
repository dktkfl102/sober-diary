export default class DateUtils {
    static toStringByFormatting(source, delimiter = "-") {
        const year = source.getFullYear();
        const month = this.leftPad(source.getMonth() + 1);
        const day = this.leftPad(source.getDate());

        return [year, month, day].join(delimiter);
    }

    static leftPad(value) {
        if (value >= 10) {
            return value;
        }

        return `0${value}`;
    }

    static daysSince(dateString) {
        // 입력된 날짜를 Date 객체로 변환
        const startDate = new Date(dateString);
        const now = new Date();

        // 현재 날짜와 입력된 날짜의 차이를 밀리초 단위로 계산
        const differenceInTime = now - startDate;

        // 차이를 일 단위로 변환
        const differenceInDays = Math.floor(
            differenceInTime / (1000 * 3600 * 24)
        );

        // 첫날 부터 하루로 계산
        return differenceInDays + 1;
    }

    static getMonthAndDay(inputDate) {
        const date = new Date(inputDate);

        const month = this.leftPad(date.getMonth() + 1);
        const day = this.leftPad(date.getDate());
        return `${month}월 ${day}일`;
    }

    static getYearAndMonth(date = new Date()) {
        const year = date.getFullYear();
        const month = this.leftPad(date.getMonth() + 1);

        return year + "-" + month;
    }

    static getMonthAndDaySlash(inputDate) {
        // "yyyy-mm-dd" 형식의 문자열을 Date 객체로 변환
        const date = new Date(inputDate);

        // 월과 일을 가져오기 (월은 0부터 시작하므로 +1)
        const month = date.getMonth() + 1;
        const day = date.getDate();

        // 원하는 형식으로 반환
        return `${month}/${day}`;
    }

    // 오늘 날짜의 Date를 YYYY-MM-DD으로 출력
    static getTodayFormatDate(today = new Date()) {
        const date = today;

        // 날짜 관련 정보 가져오기
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 1을 더하고 2자리로 만들기
        const day = date.getDate().toString().padStart(2, "0"); // 2자리로 만들기

        return year + "-" + month + "-" + day;
    }

    static getPastDate(days) {
        const today = new Date();
        today.setDate(today.getDate() - days);

        // 'YYYY-MM-DD' 형식
        return today.toISOString().slice(0, 10);
    }

    static secondsToDate(seconds) {
        const days = Math.floor(seconds / (24 * 3600));
        seconds %= 24 * 3600;
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;

        let result = "";

        if (days > 0) {
            result += `${days}일 `;
        }
        if (hours > 0) {
            result += `${hours}시간 `;
        }
        if (minutes > 0) {
            result += `${minutes}분 `;
        }
        if (seconds > 0) {
            result += `${seconds}초`;
        }

        return result.trim();
    }
}
