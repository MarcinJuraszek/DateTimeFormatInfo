var app = angular.module('app', []);

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

app.controller('AppCtrl', function ($scope) {
    $scope.legendItems = [
        { format: 'd', description: 'The day of the month, from 1 through 31.', group: 'date' },
        { format: 'dd', description: 'The day of the month, from 01 through 31.', group: 'date' },
        { format: 'ddd', description: 'The abbreviated name of the day of the week.', group: 'date' },
        { format: 'dddd', description: 'The full name of the day of the week.', group: 'date' },
        { format: 'f', description: 'The tenths of a second in a date and time value.', group: 'time' },
        { format: 'ff', description: 'The hundredths of a second in a date and time value.', group: 'time' },
        { format: 'fff', description: 'The milliseconds in a date and time value.', group: 'time' },
        { format: 'ffff', description: 'The ten thousandths of a second in a date and time value.', group: 'time' },
        { format: 'fffff', description: 'The hundred thousandths of a second in a date and time value.', group: 'time' },
        { format: 'ffffff', description: 'The millionths of a second in a date and time value.', group: 'time' },
        { format: 'fffffff', description: 'The ten millionths of a second in a date and time value.', group: 'time' },
        { format: 'F', description: 'If non-zero, the tenths of a second in a date and time value.', group: 'time' },
        { format: 'FF', description: 'If non-zero, the hundredths of a second in a date and time value.', group: 'time' },
        { format: 'FFF', description: 'If non-zero, the milliseconds in a date and time value.', group: 'time' },
        { format: 'FFFF', description: 'If non-zero, the ten thousandths of a second in a date and time value.', group: 'time' },
        { format: 'FFFFF', description: 'If non-zero, the hundred thousandths of a second in a date and time value.', group: 'time' },
        { format: 'FFFFFF', description: 'If non-zero, the millionths of a second in a date and time value.', group: 'time' },
        { format: 'FFFFFFF', description: 'If non-zero, the ten millionths of a second in a date and time value.', group: 'time' },
        { format: 'g, gg', description: 'The period or era.', group: 'date' },
        { format: 'h', description: 'The hour, using a 12-hour clock from 1 to 12.', group: 'time' },
        { format: 'hh', description: 'The hour, using a 12-hour clock from 01 to 12.', group: 'time' },
        { format: 'H', description: 'The hour, using a 24-hour clock from 0 to 23.', group: 'time' },
        { format: 'HH', description: 'The hour, using a 24-hour clock from 00 to 23.', group: 'time' },
        { format: 'K', description: 'Time zone information.', group: 'time' },
        { format: 'm', description: 'The minute, from 0 through 59.', group: 'time' },
        { format: 'mm', description: 'The minute, from 00 through 59.', group: 'time' },
        { format: 'M', description: 'The month, from 1 through 12.', group: 'date' },
        { format: 'MM', description: 'The month, from 01 through 12.', group: 'date' },
        { format: 'MMM', description: 'The abbreviated name of the month.', group: 'date' },
        { format: 'MMMM', description: 'The full name of the month.', group: 'date' },
        { format: 's', description: 'The second, from 0 through 59.', group: 'time' },
        { format: 'ss', description: 'The second, from 00 through 59.', group: 'time' },
        { format: 't', description: 'The first character of the AM/PM designator.', group: 'time' },
        { format: 'tt', description: 'The AM/PM designator.', group: 'time' },
        { format: 'y', description: 'The year, from 0 to 99.', group: 'date' },
        { format: 'yy', description: 'The year, from 00 to 99.', group: 'date' },
        { format: 'yyy', description: 'The year, with a minimum of three digits.', group: 'date' },
        { format: 'yyyy', description: 'The year as a four-digit number.', group: 'date' },
        { format: 'yyyyy', description: 'The year as a five-digit number.', group: 'date' },
        { format: 'z', description: 'Hours offset from UTC, with no leading zeros.', group: 'time' },
        { format: 'zz', description: 'Hours offset from UTC, with a leading zero for a single-digit value.', group: 'time' },
        { format: 'zzz', description: 'Hours and minutes offset from UTC.', group: 'time' },
        { format: ':', description: 'The time separator.', group: 'time' },
        { format: '/', description: 'The date separator.', group: 'date' },
        { format: 'string', description: 'Literal string delimiter.', group: 'other' },
        { format: '%', description: 'Defines the following character as a custom format specifier.', group: 'other' },
        { format: '\\', description: 'The escape character.', group: 'other' },
        { format: 'Any other character', description: 'The character is copied to the result string unchanged.', group: 'other' },
        { format: 'd', description: 'Short date pattern.', group: 'standard' },
        { format: 'D', description: 'Long date pattern.', group: 'standard' },
        { format: 'f', description: 'Full date/time pattern (short time).', group: 'standard' },
        { format: 'F', description: 'Full date/time pattern (long time).', group: 'standard' },
        { format: 'g', description: 'General date/time pattern (short time).', group: 'standard' },
        { format: 'G', description: 'General date/time pattern (long time).', group: 'standard' },
        { format: 'M, m', description: 'Month/day pattern.', group: 'standard' },
        { format: 'O, o', description: 'Round-trip date/time pattern.', group: 'standard' },
        { format: 'R, r', description: 'RFC1123 pattern.', group: 'standard' },
        { format: 's', description: 'Sortable date/time pattern.', group: 'standard' },
        { format: 't', description: 'Short time pattern.', group: 'standard' },
        { format: 'T', description: 'Long time pattern.', group: 'standard' },
        { format: 'u', description: 'Universal sortable date/time pattern.', group: 'standard' },
        { format: 'U', description: 'Universal full date/time pattern.', group: 'standard' },
        { format: 'Y, y', description: 'Year month pattern.', group: 'standard' },
        { format: 'Any other single character', description: 'Unknown specifier.', group: 'standard' },
    ];

    var formatFromQueryString = getParameterByName("format");

    $scope.format = formatFromQueryString ? formatFromQueryString : "dddd, MMMM dd, yyyy HH:mm:ss";
    $scope.formattedString = "-";

    $scope.showError = false;
    $scope.exceptionType = "";
    $scope.exceptionMessage = "";

    $scope.date = new Date();

    // filters
    $scope.isDate = function (item) { return item.group === "date" };
    $scope.isTime = function (item) { return item.group === "time" };
    $scope.isOther = function (item) { return item.group === "other" };
    $scope.isStandard = function (item) { return item.group === "standard" };

    var updateFormattedString = function () {
        $.post("https://datetimeformatinfoapi.azurewebsites.net/api/Format", JSON.stringify({ Value: $scope.date, Pattern: $scope.format }), function (data) {
            if (data.Error == null) {
                $scope.formattedString = data.FormattedValue;
                $scope.showError = false;
            } else {
                $scope.formattedString = "-";
                $scope.showError = true;
                $scope.exceptionType = data.Error.ExceptionName;
                $scope.exceptionMessage = data.Error.Message;
            }

            $scope.$apply();
        });
    };

    $scope.formatChanged = updateFormattedString;

    updateFormattedString();
});