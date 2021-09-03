export function fetchLoginInfo({ email, password }, successCb, failCb) {
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
                successCb(json.data['remember_token']);
            } else {
                setTimeout(() => {
                    failCb(false);
                }, 500);
            }
        })
        .catch((e) => {
            setTimeout(() => {
                failCb(false);
            }, 500);
        });
}
