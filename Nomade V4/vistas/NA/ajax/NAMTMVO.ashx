<%@ WebHandler Language="VB" Class="NAMTMVO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NAMTMVO : Implements IHttpHandler

    Dim flag As String

    Dim dt As DataTable
    Dim p As New Nomade.NA.NATipoMovimiento("Bn")
    Dim res As String
    Dim codigo, nombre, tipo, activo, user As String
    Dim resb As New StringBuilder

    Dim descripcion As String
    Dim movlogistico As String
    Dim imprime As String
    Dim codigo_sunat As String
    Dim movcontable As String
    Dim desc_corta As String
    Dim desc_sunat As String
    Dim p_CECC, p_CECD As String
    Dim p_CTLG_CODE, p_interno_logistico, p_OPER As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest



        'ASIGNACION DE VARIABLES CAPTURADAS 

        flag = context.Request("flag")

        codigo = context.Request("codi")
        codigo_sunat = context.Request("cosu")
        movcontable = context.Request("moco")
        desc_sunat = context.Request("desu")
        desc_corta = context.Request("deco")
        movlogistico = context.Request("molo")
        activo = context.Request("acti")
        user = context.Request("user")
        descripcion = context.Request("desc")
        imprime = context.Request("requ")
        p_CECC = context.Request("p_CECC")
        p_CECD = context.Request("p_CECD")
        p_interno_logistico = context.Request("p_interno_logistico")
        p_OPER = context.Request("p_OPER")

        p_CTLG_CODE = IIf(context.Request("p_CTLG_CODE") Is Nothing, "", context.Request("p_CTLG_CODE"))

        'FIN


        Try

            Select Case flag.ToString

                Case "1"
                    res = p.CrearTipoMovimiento(descripcion, movlogistico, imprime, codigo_sunat, movcontable, desc_sunat, desc_corta, activo, user, p_CECC, p_CECD, p_interno_logistico, p_OPER)

                Case "2"
                    res = p.ActualizarTipoMovimiento(codigo, descripcion, movlogistico, imprime, codigo_sunat, movcontable, desc_sunat, desc_corta, activo, user, p_CECC, p_CECD, p_interno_logistico, p_OPER)

                Case "3"



                Case "4"

                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarTipoMovimiento(codigo, String.Empty, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                    resb.Append("""DESC_SUNAT"" :" & """" & dt.Rows(0)("DESC_SUNAT") & """,")
                    resb.Append("""CODIGO_SUNAT"" :" & """" & dt.Rows(0)("CODIGO_SUNAT") & """,")
                    resb.Append("""DESC_CORTA"" :" & """" & dt.Rows(0)("DESC_CORTA") & """,")
                    resb.Append("""LOGISTICO"" :" & """" & dt.Rows(0)("LOGISTICO") & """,")
                    resb.Append("""CONTABLE"" :" & """" & dt.Rows(0)("CONTABLE") & """,")
                    resb.Append("""IMPRIME_IND"" :" & """" & dt.Rows(0)("IMPRIME_IND") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                    resb.Append("""CENTRO_COSTO"" :" & """" & dt.Rows(0)("CENTRO_COSTO") & """,")
                    resb.Append("""CECC"" :" & """" & dt.Rows(0)("CECC").ToString & """,")
                    resb.Append("""OPERA"" :" & """" & dt.Rows(0)("OPERA").ToString & """,")
                    resb.Append("""INTERNO_LOGISTICO"" :" & """" & dt.Rows(0)("INTERNO_LOGISTICO").ToString & """,")
                    resb.Append("""CECD"" :" & """" & dt.Rows(0)("CED").ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "CC" 'CREAR CENTRO DE COSTOS
                    context.Response.ContentType = "text/html"
                    res = p.CrearCentroCostosTipoMov(codigo, p_CTLG_CODE, p_CECC, p_CECD)

                Case "EC" 'ELIMINAR CENTRO DE COSTOS
                    context.Response.ContentType = "text/html"
                    res = p.EliminarCentroCostosTipoMov(codigo, p_CTLG_CODE, p_CECC, p_CECD)

                Case "LCC" 'LISTAR CENTRO DE COSTOS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dt As New DataTable
                    dt = p.ListarCentroCostoTipoMov(codigo, p_CTLG_CODE)
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If


            End Select

            context.Response.Write(res)


        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try





    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class