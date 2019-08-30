@extends('layouts.app')

@section('content')

<form name="custom_form_third" method="post" id="step3" action="/etapa-final">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <input type="text" name="id" value="{{ $id }}" hidden>
    <div id="businessForm">
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputCnpj">CNPJ</label>
                <input type="text" class="form-control field invalid-validation" name="cnpj" value="{{ $enrol_user->cnpj }}" id="cnpj" placeholder="__.___.___/____-__" maxlength="18" onpaste="MascaraCNPJ(custom_form_third.cnpj);" onkeypress="MascaraCNPJ(custom_form_third.cnpj);" onchange="MascaraCNPJ(custom_form_third.cnpj);" pattern="(^[0-9]{2,3}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}$)" required>
                <div id="cnpj-invalid-feedback" class="invalid-feedback">
                    Digite um CNPJ válido!
                </div>
            </div>
            <div class="form-group col-md-6">
                <label for="inputBillingRange">Porte</label>
                <select type="text" class="form-control field" name="size" value="{{ $enrol_user->size }}" id="size" placeholder="" required>
                    <option value=''>Selecione uma opção</option>
                    <option value="Microempreendendor Individual">Microempreendendor Individual
                    </option>
                    <option value="Microempresa">Microempresa</option>
                    <option value="Empresa de Pequeno Porte">Empresa de Pequeno Porte</option>
                    <option value="Empresa de Médio Porte">Empresa de Médio Porte</option>
                    <option value="Empresa de Grande Porte">Empresa de Grande Porte</option>
                </select>
                <div class="invalid-feedback">
                    Informe o porte da empresa!
                </div>
                <div id="porte-invalid-feedback" class="invalid-feedback">
                    Informe o porte da empresa!
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputSocialReason">Razão social</label>
                <input readonly type="text" class="form-control field" name="social_name" value="{{ $enrol_user->social_name }}" id="social_name" placeholder="" required>
                <div class="invalid-feedback">
                    Informe o nome comercial do seu negócio!
                </div>
            </div>
            <div class="form-group col-md-6">
                <label for="inputFantasyName">Nome fantasia</label>
                <input type="text" class="form-control field" name="fantasy_name" value="{{ $enrol_user->fantasy_name }}" id="fantasy_name" placeholder="" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputOpeningDate">Data de abertura</label>
                <input readonly type="text" class="form-control field" name="opening_date" value="{{ $enrol_user->opening_date }}" id="opening_date" placeholder="__/__/__" name="dataAbertura" onKeyPress="MascaraData(custom_form_third.dataAbertura);" maxlength="10" required>
                <div class="invalid-feedback">
                    Informe uma data válida!
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputJuridicSituation">Situação atual</label>
                <select type="text" class="form-control field" name="current_situation" value="{{ $enrol_user->current_situation }}" id="current_situation" placeholder="" required>
                    <option value="">Selecione um opção</option>
                    <option value="ativa">Ativo</option>
                    <option value="inativa">Inativo</option>
                </select>
                <div class="invalid-feedback">
                    Selecione a situação da empresa!
                </div>
            </div>
            <div class="form-group col-md-6">
                <label for="inputOccupiedPeople">Pessoas ocupadas</label>
                <input type="number" class="form-control field" name="people" value="{{ $enrol_user->people }}" id="people" placeholder="" value="" required>
            </div>
            <div class="invalid-feedback">
                Informe as pessoas ocupadas!
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-12">
                <label for="inputMainActivity">Atividade principal:</label>
                <input readonly type="text" name="main_activity" value="{{ $enrol_user->main_activity }}" class="form-control field" id="main_activity" placeholder="" required>
                <div class="invalid-feedback">
                    Informe a atividade econômica principal!
                </div>
            </div>
        </div>
    </div>
    <div class="form-row" style="justify-content: space-between;">
        <a id="third-step-button-preview" href="javascript:history.back()" class="btn btn-primary" style="margin-right: 1em">Voltar</a>
        <button type="submit" id="third_step_button" class="btn btn-primary">Finalizar cadastro</button>
    </div>
</form>

<script src="https://assets.abrasel.com.br/abrasel-assets/js/jquery.min.js"></script>
<script src="https://assets.abrasel.com.br/abrasel-assets/js/jquery.validate.min.js"></script>
<script src="js/thirdForm.js"></script>


<script>
    $().ready(function() {
        $("#step3").validate({
            rules: {
                cnpj: "required",
                size: "required",
                social_name: "required",
                fantasy_name: "required",
                opening_date: "required",
                current_situation: "required",
                people: "required",
                main_activity: "required"
            }
        });

    });
</script>

@endsection