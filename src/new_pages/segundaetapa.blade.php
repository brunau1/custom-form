@extends('layouts.app')

@section('content')

<form name="custom_form_second" id="step2" method="post" action="/terceira-etapa">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <input type="text" name="id" value="{{ $id }}" hidden>
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="inputName">Nome completo</label>
            <input type="text" class="form-control field" id="first_name" value="{{$enrol_user->first_name}} {{$enrol_user->last_name}}" placeholder="Nome completo" readonly="" required>
            <div class="invalid-feedback">
                Informe seu nome completo!
            </div>
        </div>
        <div class="form-group col-md-6">
            <label for="inputCpf">CPF</label>
            <input type="text" class="form-control field" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" class="cpf" id="cpf" value="{{$enrol_user->cpf}}" placeholder="___.___.___-__" 
            name="cpf" onkeypress="MascaraCPF(custom_form_second.cpf);" onchange="MascaraCPF(custom_form_second.cpf);" maxlength="14" required>
            <div id="cpf-invalid-feedback" class="invalid-feedback">
                Informe um CPF válido!
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="inputDate">Data de Nascimento</label>
            <input type="text" class="form-control field" id="birth_date" value="{{ $enrol_user->birth_date }}" placeholder="__/__/__" name="birth_date" onkeypress="MascaraData(custom_form_second.birth_date);" maxlength="10" required>
            <div class="invalid-feedback">
                Informe uma data válida!
            </div>
            <div id="date-invalid-feedback" class="invalid-feedback">
                Informe uma data válida!
            </div>
        </div>
        <div class="form-group col-md-6">
            <label for="inputSex">Sexo</label>
            <select class="form-control field" id="sex" value="{{ $enrol_user->sex }}" name="sex" placeholder="Selecione" required>
                <option></option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
            </select>
            <div class="invalid-feedback">
                Selecione o sexo!
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-12">
            <label for="inputPersonalSituation">Situação cadastral (receita federal)</label>
            <select type="text" class="form-control field" name="cpf_situation" value="{{ $enrol_user->cpf_situation }}" id="cpf_situation" placeholder="" required>
                <option value="ativa">Ativo</option>
                <option value="inativa">Inativo</option>
            </select>
            <div class="invalid-feedback">
                Selecione a situação!
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="inputCountry">País</label>
            <input type="text" class="form-control field" name="country" id="country" value="Brasil" required>
        </div>
        <div class="form-group col-md-6">
            <label for="inputCep">CEP</label>
            <input type="text" class="form-control field invalid-validation" value="{{ $enrol_user->zip_code }}" name="zip_code" id="zip_code" placeholder="__.___-___"
            maxlength="10" onkeypress="MascaraCep(custom_form_second.zip_code);" onpaste="MascaraCep(custom_form_second.zip_code);"
            onchange="MascaraCep(custom_form_second.zip_code);" pattern="\d{2}\.\d{3}-\d{3}" required>
            <div id="cep-invalid-feedback">
                Informe um CEP válido!
            </div>
        </div>
    </div>

    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="inputState">Estado</label>
            <input type="text" class="form-control field" name="state" value="{{ $enrol_user->state }}" id="state" required>
        </div>
        <div class="form-group col-md-6">
            <label for="inputCity">Cidade</label>
            <input type="text" class="form-control field" name="city" id="city" value="{{ $enrol_user->city }}" required>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="inputNeighborhood">Bairro</label>
            <input type="text" class="form-control field" value="{{ $enrol_user->neighborhood }}" name="neighborhood" id="neighborhood" required>
        </div>
        <div class="form-group col-md-6">
            <label for="inputAddress">Endereço</label>
            <input type="text" class="form-control field" value="{{ $enrol_user->address }}" name="address" id="address" required>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="inputNumber">Número</label>
            <input type="number" class="form-control field" name="number" value="{{ $enrol_user->number }}" id="number" required>
        </div>
        <div class="form-group col-md-6">
            <label for="inputComplement">Complemento</label>
            <input type="text" class="form-control field" name="complement" value="{{ $enrol_user->complement }}" id="complement">
        </div>
    </div>
    <div class="form-row" style="justify-content: space-between;">
        <a id="second-step-button-preview" class="btn btn-primary" href="javascript:history.back()">Voltar</a>
        <button type="submit" id="second_step_button_next" class="btn btn-primary">Próximo</button>
        <button hidden type="submit" id="second_step_button_post" class="btn btn-primary">Finalizar cadastro</button>
    </div>
</form>

<script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
<script src="https://assets.abrasel.com.br/abrasel-assets/js/jquery.min.js"></script>
<script src="https://assets.abrasel.com.br/abrasel-assets/js/jquery.validate.min.js"></script>
<script src="js/secondForm.js"></script>

<script>
    $().ready(function() {
        $("#step2").validate({
            rules: {
                sex: "required",
                country: "required",
                state: "required",
                city: "required",
                neighborhood: "required",
                address: "required",
                number: "required",
                complement: "required"
            }
        });
    });
</script>

@endsection