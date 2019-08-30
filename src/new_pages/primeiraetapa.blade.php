@extends('layouts.app')

@section('content')

<form name="custom_form_first" id="step1" method="post" action="/segunda-etapa">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <?php
    if ($id) {
        echo "<input type='hidden' name='id' value='{{ $id }}'>";
    } ?>
    <div class="form-row">
        <div class="form-group col-md-12">
            <label for="business">Você é: </label>
            <select class="form-control field" id="user_type" name="user_type" placeholder="Selecione" onclick="showBusinessForm()" value="{{ $enrol_user->user_type }}" required>
                <option value="">Selecione uma opção</option>
                <option value="Dono de bar(es) e/ou restaurante(s)">Dono de bar(es) e/ou
                    restaurante(s)</option>
                <option value="Profissional do setor de bar(es) e/ou
                                            restaurante(s)">Profissional do setor de bar(es) e/ou
                    restaurante(s)</option>
                <option value="Quero abrir um negócio">Quero abrir um negócio</option>
                <option value="Outro">Outro</option>
            </select>
            <div class="invalid-feedback">
                Selecione o perfil de usuário!
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-12">
            <label for="inputName">Nome</label>
            <input type="text" class="form-control field" id="first_name" value="{{ $enrol_user->first_name }}" name="first_name" placeholder="Nome" required>
            <div class="invalid-feedback">
                Informe seu nome completo!
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-12">
            <label for="inputName">Sobrenome</label>
            <input type="text" class="form-control field" id="last_name" value="{{ $enrol_user->last_name }}" name="last_name" placeholder="Sobrenome" required>
            <div class="invalid-feedback">
                Informe seu nome completo!
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-12">
            <label for="inputUserName">Nome de usuário (apenas letras minúsculas)</label>
            <input type="text" class="form-control field" id="username" value="{{ $enrol_user->username }}" name="username" placeholder="Nome para acesso" required>
            <div id="user-name-invalid-feedback">
                O nome deve ter letras minúsculas e sem espaçamento!
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="inputEmail">Email</label>
            <input type="text" class="form-control field" id="email" value="{{ $enrol_user->email }}" name="email" placeholder="email@example.com" required>
            <div id="email-invalid-feedback">
                Insira um endereço de email válido!
            </div>
        </div>
        <div class="form-group col-md-6">
            <label for="inputPassword">Senha: (minimo de 6 caracteres)</label>
            <input type="password" pattern="[a-zA-Z0-9]{6,}" class="form-control field" id="password" value="{{ $enrol_user->password }}" name="password" placeholder="" required>
            <div id="password-invalid-feedback">
                Informe uma senha válida!
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="inputPhone">Telefone</label>
            <input type="text" class="form-control field" pattern="(\([0-9]{2})\) [0-9]{5}-[0-9]{4}" id="phone_number" value="{{ $enrol_user->phone_number }}" name="phone_number" 
            placeholder="(  ) _____-____" onkeypress="MascaraTelefone(custom_form_first.phone_number);" maxlength="15" onchange="MascaraTelefone(custom_form_first.phone_number);"
            required>
            <div class="invalid-feedback">
                Informe um número de telefone válido!
            </div>
            <div id="phone-invalid-feedback" class="invalid-feedback">
                Informe um número de telefone válido!
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="form-check">
            <input type="checkbox" class="form-check-input" id="check_terms">
            <label class="form-check-label" for="exampleCheck1">Concordo com os <a href="https://cursos.abrasel.com.br/termos-de-uso-abrasel.pdf" target="_blank">termos de serviço</a> da Abrasel</label>
        </div>
    </div>
    <div class="form-row" style="justify-content: flex-end;">
        <button type="submit" id="first_step_button_next" class="btn btn-primary">Próximo</button>
    </div>
</form>


<script src="https://assets.abrasel.com.br/abrasel-assets/js/jquery.min.js"></script>
<script src="https://assets.abrasel.com.br/abrasel-assets/js/jquery.validate.min.js"></script>

<script>
    $().ready(function() {
        $("#step1").validate({
            rules: {
                first_name: "required",
                last_name: "required",
                username: "required",
                email: "required",
                password: "required",
                phone_number: "required"
            }
        });

    });
</script>

<script src="js/firstForm.js"></script>

@endsection