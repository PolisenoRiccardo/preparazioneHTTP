from flask import Flask, jsonify, request

app = Flask(__name__)

# Dati di esempio
tasks = [
    {
        'id': 1,
        'title': 'Fare la spesa',
        'description': 'Comprare latte, uova, pane',
        'done': False
    },
    {
        'id': 2,
        'title': 'Imparare Flask',
        'description': 'Fare un tutorial su Flask',
        'done': False
    }
]

# Endpoint per ottenere tutte le attività
@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks})

# Endpoint per ottenere una specifica attività
@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = [task for task in tasks if task['id'] == task_id]
    if len(task) == 0:
        abort(404)
    return jsonify({'task': task[0]})

# Endpoint per creare una nuova attività
@app.route('/tasks', methods=['POST'])
def create_task():
    if not request.json or not 'title' in request.json:
        abort(400)
    task = {
        'id': tasks[-1]['id'] + 1,
        'title': request.json['title'],
        'description': request.json.get('description', ""),
        'done': False
    }
    tasks.append(task)
    return jsonify({'task': task}), 201

if __name__ == '__main__':
    app.run(debug=True)
