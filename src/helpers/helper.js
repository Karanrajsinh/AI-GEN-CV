export function toggleIsVisible(type, index, setResumeInfo) {

    if (type === 'summary') {
        setResumeInfo((prev) => {
            return {
                ...prev,
                summaryVisible: !prev.summaryVisible
            }
        })
    }

    else {
        setResumeInfo((prev) => {
            return {
                ...prev,
                [type]: prev[type].map((type, expIndex) =>
                    expIndex === index
                        ? { ...type, isVisible: !type.isVisible }
                        : type
                ),
            };
        });
    }
}

export function toggleIsSectionVisible(type, setResumeInfo) {
    setResumeInfo((prev) => {
        return {
            ...prev,
            [`is${type}Visible`]: !prev[`is${type}Visible`]
        };
    })
}