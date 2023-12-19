<%@ WebHandler Language="VB" Class="NNLDREQ" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNLDREQ : Implements IHttpHandler
    Dim OPCION As String
    Dim p_CTLG_CODE, p_SCSL_CODE, p_ANIO, p_SURE As String
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            OPCION = context.Request("OPCION")

            p_CTLG_CODE = context.Request("p_CTLG_CODE")
            p_SCSL_CODE = context.Request("p_SCSL_CODE")
            p_ANIO = context.Request("p_ANIO")
            p_SURE = context.Request("p_SURE") 'Monto minimo retencion de renta

            Select Case OPCION
                Case "LHONORARIOS" ' lista 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NN.NNHonorarios("Bn").listarHonorariosConRetencion(p_SURE, p_CTLG_CODE, p_ANIO, IIf(p_SCSL_CODE = Nothing, String.Empty, p_SCSL_CODE))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""MES"" :" & """" & MiDataRow("MES").ToString & """,")
                            resb.Append("""MONTO_RETENIDO"" :" & """" & MiDataRow("MONTO_RETENIDO").ToString & """,")
                            resb.Append("""HONORARIOS_RETENIDOS_NETO"" :" & """" & MiDataRow("HONORARIOS_RETENIDOS_NETO").ToString & """,")
                            resb.Append("""HONORARIOS_RETENIDOS"" :" & """" & MiDataRow("HONORARIOS_RETENIDOS").ToString & """,")
                            resb.Append("""TOTAL_HONORARIOS"" :" & """" & MiDataRow("TOTAL_HONORARIOS").ToString & """,")
                            resb.Append("""NRO_HONORARIOS"" :" & """" & MiDataRow("NRO_HONORARIOS").ToString & """,")
                            resb.Append("""HONORARIOS_CON_RETENCION"" :" & """" & MiDataRow("HONORARIOS_CON_RETENCION").ToString & """,")
                            resb.Append("""HONORARIOS_CON_SUSPENCION"" :" & """" & MiDataRow("HONORARIOS_CON_SUSPENCION").ToString & """")

                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
            End Select
            context.Response.Write(res)

        Catch ex As Exception
            Dim sMensajeError As String = ex.Message
            If (sMensajeError.IndexOf("[Advertencia]:") > -1) Then
                context.Response.Write(sMensajeError)
            Else
                context.Response.Write("[Error]: " + sMensajeError)
            End If
        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class