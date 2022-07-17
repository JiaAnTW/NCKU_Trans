export function changeHeaderInfo(title, description) {
    document.title = title;

    let descriptionTxt = description;
    descriptionTxt = descriptionTxt.replaceAll('\n', '');

    if (descriptionTxt.length > 85) {
        descriptionTxt = descriptionTxt.substring(0, 85) + '......';
    }

    const headerDescription = document.querySelector(
        'meta[name="description"]'
    );
    if (headerDescription) {
        headerDescription.content = descriptionTxt;
    }
}
