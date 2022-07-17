export default (() => {
    const yearOption = [];
    const clock = new Date();
    let latestYear = clock.getFullYear() - 1911;
    if (clock.getMonth() < 7) latestYear--;
    for (let i = 0; i < 5; ++i) {
        const yearItem = latestYear - i;
        yearOption.push({ value: yearItem, text: yearItem });
    }
    return { yearOption, latestYear };
})();
