export function fetchLoginInfo({ email, password }, cb) {
    const user = { email, password };
    fetch('/api/post/user/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
    })
        .then((res) => res.json())
        .then((json) => {
            if (json['success']) {
                cb(json.data['remember_token']);
            }
        })
        .catch((e) => {});
}
