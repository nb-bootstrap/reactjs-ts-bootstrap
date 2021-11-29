const __REM_UNIT = 20;
module.exports = {
    install: function (less, pluginManager, functions) {
        functions.add('rem', function (value) {
            return `${parseInt(parseInt(value.value) / __REM_UNIT)}px`;
        });
    },
};
