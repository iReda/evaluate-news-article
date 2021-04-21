export const handleSubmit = (e) => {
    e.preventDefault()
    const url = document.querySelector('#article-url').value
    if (Client.isValidURL(url)) {
        console.log(':: Form Submitted ::')
        // postData('http://localhost:8081/all', { url })
        fetch('http://localhost:8081/all', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            // Body data type must match "Content-Type" header
            body: JSON.stringify({ url })
        })
            .then((responseData) => {
                return responseData.json()
            })
            .then((data) => {
                console.log(data)
                const { text, score_tag, agreement, subjectivity, confidence, irony } = data
                document.getElementById('text').textContent = text
                document.getElementById('score_tag').textContent = score_tag
                document.getElementById('agreement').textContent = agreement
                document.getElementById('subjectivity').textContent = subjectivity
                document.getElementById('confidence').textContent = confidence
                document.getElementById('irony').textContent = irony
            })
    }
}
