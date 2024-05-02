from flask import Flask, jsonify, request

app = Flask(__name__)

appointments = []

@app.route('/appointments', methods=['GET'])
def get_appointments():
    return jsonify({'appointments': appointments})

@app.route('/appointments/<int:appointment_id>', methods=['GET'])
def get_appointment(appointment_id):
    appointment = [appointment for appointment in appointments if appointment['id'] == appointment_id]
    if len(appointment) == 0:
        abort(404)
    return jsonify({'appointment': appointment[0]})

@app.route('/appointments', methods=['POST'])
def create_appointment():
    if not request.json or not all(key in request.json for key in ['nome', 'cognome', 'indirizzo', 'telefono', 'email', 'data', 'ora']):
        abort(400)
    appointment = {
        'nome': request.json['nome'],
        'cognome': request.json['cognome'],
        'indirizzo': request.json['indirizzo'],
        'telefono': request.json['telefono'],
        'email': request.json['email'],
        'data': request.json['data'],
        'ora': request.json['ora']
    }
    appointments.append(appointment)
    return jsonify({'appointment': appointment}), 201

if __name__ == '__main__':
    app.run(debug=True)
