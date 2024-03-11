let tokenID = localStorage.getItem("tokenID")

export async function postUser(body) {
    return await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body
    })
}

export async function postWork(body) {
    return await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {Authorization: `Bearer ${tokenID}`},
        body: body
    })
}

export async function deleteWork(workId) {
    return await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: { 
        accept: "*/*",
        Authorization: `Bearer ${tokenID}`}
    })
}
