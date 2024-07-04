<%@ WebHandler Language="VB" Class="NCSCSL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCSCSL : Implements IHttpHandler

    'Declaramos variables para usarlas en el proceso
    Dim flag, acti, cod_est_sunat, empresa, sucursal, dire, estable, telef, pais, ubigeo, fechai, fechat, user, propietario, codelim, cod As String
    Dim p_Code_Pais, p_Code_Depa, p_Code_Prov, p_Code_Dist, p_Code_Ubigeo, p_Code_Empr, exonerado, bio_ind, URBAN, p_pie_pagina_recibos As String
    Dim dt As DataTable
    Dim codrec As String
    Dim resb As New StringBuilder
    'Instanciamos las clases de Persona
    Dim P As New Nomade.NC.NCSucursal("Bn")
    Dim res As String
    Dim usua As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'Capturamos los valores que nos envia el formulario
        '======================================

        codrec = context.Request("codigo")
        '-------------------------------'



        codelim = context.Request("codelim")


        flag = context.Request("flag")

        'parametros de combos
        'ubigeo
        p_Code_Ubigeo = IIf(context.Request("p_Code_Ubigeo") = Nothing, "", context.Request("p_Code_Ubigeo"))
        p_Code_Pais = IIf(context.Request("p_code_pais") = Nothing, "", context.Request("p_code_pais"))
        p_Code_Depa = IIf(context.Request("p_code_depa") = Nothing, "", context.Request("p_code_depa"))
        p_Code_Prov = IIf(context.Request("p_code_prov") = Nothing, "", context.Request("p_code_prov"))
        p_Code_Dist = IIf(context.Request("p_code_dist") = Nothing, "", context.Request("p_code_dist"))
        URBAN = context.Request("URBAN")
        usua = context.Request("usua")

        'fin combos

        cod = context.Request("codi")
        acti = context.Request("acti")
        cod_est_sunat = context.Request("cod_est_sunat")
        empresa = context.Request("empresa")
        sucursal = context.Request("sucursal")
        dire = context.Request("dire")
        estable = context.Request("estable")
        telef = context.Request("telef")
        pais = context.Request("pais")
        ubigeo = context.Request("ubigeo")
        fechai = context.Request("fechai")
        If fechai <> String.Empty Then
            fechai = Utilities.fechaLocal(context.Request("fechai"))
        End If
        fechat = context.Request("fechat")
        If fechat <> String.Empty Then
            fechat = Utilities.fechaLocal(context.Request("fechat"))
        End If

        user = context.Request("user")
        propietario = context.Request("propietario")
        exonerado = context.Request("exonerado")
        bio_ind = context.Request("bio_ind")

        p_pie_pagina_recibos = context.Request("p_pie_pagina_recibos")

        context.Response.ContentType = "text/html"
        Try
            If (flag = "1") Then
                res = CrearSucursal(empresa, cod_est_sunat, sucursal, propietario, dire, telef, fechai, ubigeo, URBAN, fechat, acti, user, estable, pais, bio_ind, exonerado, p_pie_pagina_recibos)

            ElseIf (flag = "2") Then
                res = ActualizarSucursal(empresa, cod, cod_est_sunat, sucursal, propietario, dire, telef, fechai, ubigeo, URBAN, fechat, acti, user, estable, pais, bio_ind, exonerado, p_pie_pagina_recibos)


            ElseIf (flag = "3") Then
                res = CambiarEstadoEmpresa(codelim) 'cambiar estado Inactivo/Activo


            ElseIf (flag = "4") Then

                Dim p2 As New Nomade.NC.NCPais("BN")
                dt = p2.Listar_Pais(String.Empty, String.Empty, "A")
                If dt Is Nothing Then
                    res = GenerarSelect(dt, "slcPais", "codigo", "codigo", "descripcion", "SELECCIONE PAIS")
                Else
                    res = GenerarSelect(SortDataTableColumn(dt, "Descripcion", "ASC"), "slcPais", "codigo", "codigo", "descripcion", "SELECCIONE PAIS")
                End If
            ElseIf (flag = "5") Then
                Dim p As New Nomade.NC.NCUbigeo("BN")
                dt = p.Listar_Ubigeo(String.Empty, String.Empty, String.Empty, 1, p_Code_Pais, "A")
                res = GenerarSelect(dt, "slcDepartamento", "ubigeo", "ubigeo", "descripcion", "DEPARTAMENTO")

            ElseIf (flag = "6") Then
                Dim p As New Nomade.NC.NCUbigeo("BN")
                dt = p.Listar_Ubigeo("", "", p_Code_Depa, 2, p_Code_Pais, "A")
                res = GenerarSelect(dt, "slcProvincia", "ubigeo", "ubigeo", "descripcion", "PROVINCIA")

            ElseIf (flag = "7") Then
                Dim p As New Nomade.NC.NCUbigeo("BN")
                dt = p.Listar_Ubigeo(String.Empty, String.Empty, p_Code_Prov, 3, p_Code_Pais, "A")
                res = GenerarSelect(dt, "slcDistrito", "ubigeo", "codigo", "descripcion", "DISTRITO")

            ElseIf (flag = "8") Then
                Dim p As New Nomade.NC.NCEmpresa("BN")
                dt = p.ListarTotalEmpresa(String.Empty, "A")

                If dt Is Nothing Then
                    res = GenerarSelect(dt, "slcEmpresa", "codigo", "codigo", "descripcion", "EMPRESA")
                Else
                    res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "slcEmpresa", "codigo", "codigo", "descripcion", "EMPRESA")
                End If

            ElseIf (flag = "9") Then
                Dim p As New Nomade.NC.NCEstablecimientos("BN")
                dt = p.ListarEstablecimiento(String.Empty, "A")

                If dt Is Nothing Then
                    res = GenerarSelect(dt, "slcEstablecimientos", "codigo", "codigo", "tipo", "ESTABLECIMIENTO")
                Else
                    res = GenerarSelect(SortDataTableColumn(dt, "TIPO", "ASC"), "slcEstablecimientos", "codigo", "codigo", "tipo", "ESTABLECIMIENTO")
                End If
            ElseIf (flag = "LSUC") Then
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dt As New DataTable
                dt = P.ListarSucursal(IIf(empresa Is Nothing, String.Empty, empresa), IIf(codrec Is Nothing, String.Empty, codrec), IIf(exonerado Is Nothing, String.Empty, exonerado))
                If dt Is Nothing Then
                    res = "{}"
                Else
                    res = Utilities.DataTableToJSON(dt)
                End If

            ElseIf (codrec <> String.Empty) Then 'cargar los datos en formato json 

                context.Response.ContentType = "application/json; charset=utf-8"
                dt = P.ListarSucursal(empresa, codrec, String.Empty)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                resb.Append("""EMPRESA"" :" & """" & dt.Rows(0)("CODE_EMPRESA") & """,")
                resb.Append("""COD_SUNAT"" :" & """" & dt.Rows(0)("COD_SUNAT") & """,")
                resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                resb.Append("""DIRECCION"" :" & """" & dt.Rows(0)("DIRECCION") & """,")
                resb.Append("""ESTABLECIMIENTO"" :" & """" & dt.Rows(0)("ESTABLECIMIENTO") & """,")
                resb.Append("""TELEFONO"" :" & """" & dt.Rows(0)("TELEFONO") & """,")
                resb.Append("""ACTIVO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                resb.Append("""PAIS"" :" & """" & dt.Rows(0)("PAIS") & """,")
                resb.Append("""FECHA_TERMINO"" :" & """" & dt.Rows(0)("FECHA_TERMINO") & """,")
                resb.Append("""FECHA_INICIO"" :" & """" & dt.Rows(0)("FECHA_INICIO") & """,")
                resb.Append("""DEPARTAMENTO"" :" & """" & dt.Rows(0)("DEPARTAMENTO") & """,")
                resb.Append("""PROVINCIA"" :" & """" & dt.Rows(0)("PROVINCIA") & """,")
                resb.Append("""UBIGEO"" :" & """" & dt.Rows(0)("UBIGEO") & """,")
                resb.Append("""URBAN"" :" & """" & dt.Rows(0)("URBAN") & """,")
                resb.Append("""EXONERADO"" :" & """" & dt.Rows(0)("EXONERADO") & """,")
                resb.Append("""PIE_PAGINA_RECIBO"" :" & """" & dt.Rows(0)("PIE_PAGINA_RECIBO") & """,")
                resb.Append("""DISTRITO"" :" & """" & dt.Rows(0)("DISTRITO") & """,")
                resb.Append("""BIO_IND"" :" & """" & dt.Rows(0)("BIO_IND") & """,")
                resb.Append("""CTLG_BIO_IND"" :" & """" & dt.Rows(0)("CTLG_BIO_IND") & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()






            End If

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function CrearSucursal(ByVal p_codiemp As String, ByVal p_COD_EST_SUNAT As String, ByVal p_desc As String, ByVal p_propie As String, ByVal p_direc As String, ByVal p_tel As String, ByVal p_fini As String, ByVal p_ubigeo As String, ByVal p_Urban As String, ByVal p_fterm As String, ByVal p_estado As String, ByVal p_user As String, ByVal p_establecimiento As String, ByVal p_pais As String, p_bio_ind As String, ByVal exonerado As String, ByVal p_pie_pagina_recibos As String) As String
        Dim datos(2) As String
        datos = P.CrearSucursal(p_codiemp, p_COD_EST_SUNAT, p_desc, p_propie, p_direc, p_tel, p_fini, p_ubigeo, p_Urban, p_fterm, p_estado, p_user, p_establecimiento, p_pais, p_bio_ind, p_pie_pagina_recibos, exonerado)

        Return datos(0)

    End Function




    Public Function ActualizarSucursal(ByVal p_codiemp As String, ByVal p_codisuc As String, ByVal p_COD_EST_SUNAT As String, ByVal p_desc As String, ByVal p_propie As String, ByVal p_direc As String, ByVal p_tel As String, ByVal p_fini As String, ByVal p_ubigeo As String, ByVal p_Urban As String, ByVal p_fterm As String, ByVal p_estado As String, ByVal p_user As String, ByVal p_establecimiento As String, ByVal p_pais As String, p_bio_ind As String, ByVal exonerado As String, ByVal p_pie_pagina_recibos As String) As String
        Dim datos As String
        datos = P.ActualizarSucursal(p_codiemp, p_codisuc, p_COD_EST_SUNAT, p_desc, p_propie, p_direc, p_tel, p_fini, p_ubigeo, p_Urban, p_fterm, p_estado, p_user, p_establecimiento, p_pais, p_bio_ind, p_pie_pagina_recibos, exonerado)
        Return datos
    End Function


    'combo para pais, departamento,provincia,distrito
    Public Function GenerarSelect(ByVal dt As DataTable, ByVal id As String, ByVal cvalue As String, ByVal codigoid As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then

            res = "<select class=""span12"" id=""" & id & """>"
            res += "<option value=""0""><option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If (dt.Columns.Contains("EXO_IGV_IND")) Then
                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & "%" & dt.Rows(i)(codigoid).ToString() & """ exo_igv=""" & dt.Rows(i)("EXO_IGV_IND").ToString() & """ bio_ind=""" & dt.Rows(i)("BIO_IND").ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & "%" & dt.Rows(i)(codigoid).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                End If


            Next
            res += "</select>"
        Else
            res = "error"
        End If
        Return res
    End Function


    Public Function CambiarEstadoEmpresa(ByVal cod As String) As String
        Dim datos As String
        datos = P.CambiarEstadoSucursal(cod)
        Return datos
    End Function



    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property



    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function


End Class