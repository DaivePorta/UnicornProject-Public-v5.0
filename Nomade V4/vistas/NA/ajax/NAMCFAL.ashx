<%@ WebHandler Language="VB" Class="NAMCFAL" %>
Imports System
Imports System.Web
Imports System.Data

Public Class NAMCFAL : Implements IHttpHandler

    Dim code As String
    Dim opcion As String

    Dim CODIGO, EMPRESA, SUCURSAL, DESCRIPCION, TIPO_ALMACEN, ENCARGADO,
   DIRECCION, PAIS, UBIGEO, TELEFONO, ANEXO, FECHAINI,
   FECHATER, IMPRESORA, ESTADO, DEPAR, PROVI, DISTR, URBAN, USUARIO As String

    Dim dt, dt2 As DataTable
    Dim p As New Nomade.NA.NAConfAlmacenes("bn")
    Dim r As New Nomade.NA.NATipoAlmacen("bn")
    Dim res As String
    Dim resb As New StringBuilder
    Dim p_Code_Ubigeo, p_Code_Pais, p_Code_Depa, p_Code_Prov, p_Code_Dist As String
    Dim codempr As String
    Dim usua As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest



        opcion = context.Request("opcion")
        code = context.Request("code")

        CODIGO = context.Request("CODIGO")
        EMPRESA = context.Request("EMPRESA")
        SUCURSAL = context.Request("SUCURSAL")
        DESCRIPCION = context.Request("DESCRIPCION")
        TIPO_ALMACEN=context.Request("TIPO_ALMACEN")
        ENCARGADO = context.Request("ENCARGADO")
        DIRECCION = context.Request("DIRECCION")
        PAIS = context.Request("PAIS")
        UBIGEO = context.Request("UBIGEO")
        TELEFONO = context.Request("TELEFONO")
        ANEXO = context.Request("ANEXO")
        FECHAINI = context.Request("FECHAINI")
        If FECHAINI <> String.Empty Then
            FECHAINI = Utilities.fechaLocal(context.Request("FECHAINI"))
        End If
        FECHATER = context.Request("FECHATER")
        If FECHATER <> String.Empty Then
            FECHATER = Utilities.fechaLocal(context.Request("FECHATER"))
        End If
        ESTADO = context.Request("ESTADO")

        IMPRESORA = context.Request("IMPRESORA")



        DEPAR = context.Request("DEPAR")
        PROVI = context.Request("PROVI")
        DISTR = context.Request("DISTR")
        USUARIO = context.Request("USUARIO")

        'ubigeo
        p_Code_Ubigeo = IIf(context.Request("p_Code_Ubigeo") = Nothing, "", context.Request("p_Code_Ubigeo"))
        p_Code_Pais = IIf(context.Request("p_code_pais") = Nothing, "", context.Request("p_code_pais"))
        p_Code_Depa = IIf(context.Request("p_code_depa") = Nothing, "", context.Request("p_code_depa"))
        p_Code_Prov = IIf(context.Request("p_code_prov") = Nothing, "", context.Request("p_code_prov"))
        p_Code_Dist = IIf(context.Request("p_code_dist") = Nothing, "", context.Request("p_code_dist"))
        URBAN = context.Request("URBAN")
        codempr = context.Request("codempr")
        usua = context.Request("usua")

        Try
            Select Case opcion

                Case "1"
                    res = p.CrearAlmacenes(EMPRESA, SUCURSAL, DESCRIPCION, TIPO_ALMACEN, ENCARGADO, DIRECCION, PAIS, UBIGEO, URBAN, TELEFONO, ANEXO, FECHAINI, FECHATER, IMPRESORA, ESTADO, USUARIO)

                Case "2"
                    res = p.ActualizarAlmacenes(CODIGO, EMPRESA, SUCURSAL, DESCRIPCION, TIPO_ALMACEN, ENCARGADO, DIRECCION, PAIS, UBIGEO, URBAN, TELEFONO, ANEXO, FECHAINI, FECHATER, IMPRESORA, ESTADO, USUARIO)

                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarAlmacenes(code, codempr, String.Empty, String.Empty)

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""code"":" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""EMPRESA"":" & """" & MiDataRow("CODE_EMPRESA").ToString & """,")
                            resb.Append("""SUCURSAL"":" & """" & MiDataRow("CODE_SUCURSAL").ToString & """,")
                            resb.Append("""DESCRIPCION"":" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""TIPO_ALMACEN"":" & """" & MiDataRow("TIPO_ALMACEN").ToString & """,")
                            resb.Append("""ENCARGADO_ALMACEN"":" & """" & MiDataRow("ENCARGADO_ALMACEN").ToString & """,")
                            resb.Append("""DIRECCION"":" & """" & MiDataRow("DIRECCION").ToString & """,")
                            resb.Append("""PAIS"":" & """" & MiDataRow("PAIS").ToString & """,")
                            resb.Append("""UBIGEO"":" & """" & MiDataRow("UBIGEO").ToString & """,")
                            resb.Append("""URBAN"":" & """" & MiDataRow("URBAN").ToString & """,")
                            resb.Append("""TELEFONO"":" & """" & MiDataRow("TELEFONO").ToString & """,")
                            resb.Append("""ANEXO"":" & """" & MiDataRow("ANEXO").ToString & """,")
                            resb.Append("""FECHA_INICIO"":" & """" & MiDataRow("FECHA_INICIO").ToString & """,")
                            resb.Append("""FECHA_TERMINO"":" & """" & MiDataRow("FECHA_TERMINO").ToString & """,")
                            resb.Append("""IMPRESORA"":" & """" & MiDataRow("IMPRESORA").ToString & """,")
                            resb.Append("""DEPARTAMENTO"":" & """" & MiDataRow("DEPARTAMENTO").ToString & """,")
                            resb.Append("""PROVINCIA"":" & """" & MiDataRow("PROVINCIA").ToString & """,")
                            resb.Append("""DISTRITO"":" & """" & MiDataRow("DISTRITO").ToString & """,")
                            resb.Append("""ESTADO_IND"":" & """" & MiDataRow("ESTADO_IND").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")

                    End If
                    res = resb.ToString()

                Case "E"
                    res = CambiarEstadoAlmacenes(code)


                Case "5"
                    Dim p2 As New Nomade.NC.NCPais("BN")
                    dt = p2.Listar_Pais(String.Empty, String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "descripcion", "PAIS")

                Case "6"
                    Dim p2 As New Nomade.NC.NCUbigeo("BN")
                    dt = p2.Listar_Ubigeo(String.Empty, String.Empty, String.Empty, 1, p_Code_Pais, "A")
                    res = GenerarSelect(dt, "ubigeo", "descripcion", "DEPARTAMENTO")

                Case "7"
                    Dim p2 As New Nomade.NC.NCUbigeo("BN")
                    dt = p2.Listar_Ubigeo(String.Empty, String.Empty, p_Code_Depa, 2, p_Code_Pais, "A")
                    res = GenerarSelect(dt, "ubigeo", "descripcion", "PROVINCIA")

                Case "8"
                    Dim p2 As New Nomade.NC.NCUbigeo("BN")
                    dt = p2.Listar_Ubigeo(String.Empty, String.Empty, p_Code_Prov, 3, p_Code_Pais, "A")
                    res = GenerarSelect(dt, "ubigeo", "descripcion", "DISTRITO")

                Case "9"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")

                Case "10"
                    Dim p2 As New Nomade.NC.NCSucursal("BN")
                    dt = p2.ListarSucursal(codempr, String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "descripcion", "SUCURSAL")

                Case "11"
                    Dim p2 As New Nomade.NA.NAConfAlmacenes("BN")
                    dt = p2.ListarEmpleados(codempr)
                    res = GenerarSelect(dt, "pidm", "empleado", "EMPLEADO")

                Case "12"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCEEmpleado("BN").Listar_Empleados(code, 0, "")
                    dt2 = New Nomade.NC.NCPersona("BN").listar_Persona_Natural(code, String.Empty, String.Empty)
                    If Not (dt2 Is Nothing) Then
                        resb.Append("[")

                        resb.Append("{")
                        resb.Append("""NOMBRE"":" & """" & dt2.Rows(0)("NOMBRE").ToString & """,")
                        resb.Append("""APELL_PATE"":" & """" & dt2.Rows(0)("APELL_PATE").ToString & """,")
                        resb.Append("""APELL_MATE"":" & """" & dt2.Rows(0)("APELL_MATE").ToString & """,")
                        resb.Append("""NCARG_DESC"":" & """" & dt.Rows(0)("CARGO").ToString & """,")
                        resb.Append("""NUMERO"":" & """" & dt2.Rows(0)("NUMERO").ToString & """,")
                        resb.Append("""CORREO"":" & """" & dt2.Rows(0)("CORREO").ToString & """,")
                        resb.Append("""PPBIMAG_NOMBRE"":" & """" & dt2.Rows(0)("PPBIMAG_NOMBRE").ToString & """")

                        resb.Append("}")

                        resb.Append("]")

                    End If
                    res = resb.ToString()



                Case "15"
                    Dim r As New Nomade.NA.NATipoAlmacen("bn")
                    dt = r.ListarTipoAlmacen(String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "nombre", "TIPOS_ALMACEN")

                Case "16"
                    Dim r As New Nomade.NA.NATipoAlmacen("bn")
                    dt = r.ListarTipoAlmacen(code, String.Empty)
                    res = dt.Rows(0)("descripcion").ToString()

                Case "17"
                    Dim p2 As New Nomade.NC.NCImpresora("BN")
                    dt = p2.ListarImpresora(String.Empty, "A", String.Empty)
                    res = GenerarSelect(dt, "codigo", "impresora", "impresora")

                Case "18" 'listar ubigeo paises
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p2 As New Nomade.NC.NCPais("BN")
                    dt = p2.Listar_Pais(String.Empty, String.Empty, "A")
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If
                Case "19" 'listar ubigeo departamento
                    'Dim oDt As DataTable
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oUbigeo As New Nomade.NC.NCUbigeo("bn")

                    dt = oUbigeo.fnListar_Ubigeo_Depa(p_Code_Pais, p_Code_Depa)
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

                Case "20" 'listar ubigeo provincias
                    'Dim oDt As DataTable
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oUbigeo As New Nomade.NC.NCUbigeo("bn")

                    dt = oUbigeo.fnListar_Ubigeo_Prov(p_Code_Depa, p_Code_Prov)
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

                Case "21" 'listar ubigeo distritos
                    'Dim oDt As DataTable
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oUbigeo As New Nomade.NC.NCUbigeo("bn")

                    dt = oUbigeo.fnListar_Ubigeo_Dist(p_Code_Ubigeo, p_Code_Prov, p_Code_Dist)
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

                Case Else

            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try
    End Sub

    Public Function CambiarEstadoAlmacenes(ByVal p_CODE As String) As String

        Dim datos(1) As String

        datos = p.CambiarEstadoAlmacenes(p_CODE)

        Return datos(0)

    End Function

    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then


            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If clase <> "DISTRITO" Then
                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & "%" & dt.Rows(i)("codigo").ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                End If
            Next

        Else
            res = "error"
        End If
        Return res
    End Function



    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class




     