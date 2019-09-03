@extends('layouts.app')

@section('content')

<style>
.card-body{
    text-align: center;
}
#form-title{
    text-align: center;
}
#step{
    display: none;  
}
</style>

<h2>Usuário cadastrado!</h2>
<h4>Você será redirecionado.</h4>

<form action="https://abrasel.dj.emp.br/login/index.php" method="POST" id="userform" hidden>
    <input type="hidden" name="username" value="{{ $enrol_user->username }}">
    <input type="hidden" name="password" value="{{ $enrol_user->password }}">
</form>

<script src="js/etapafinal.js"></script>

@endsection