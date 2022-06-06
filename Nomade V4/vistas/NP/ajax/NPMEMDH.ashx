<%@ WebHandler Language="VB" Class="NPMEMDH" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NPMEMDH : Implements IHttpHandler
    
    Dim sOpcion As String
    Dim sCodEmpresa, sCodEstablec, sCodUsuario, sEstado, sCodEstablecCBO, nIdPersSoc, sIdPersSoc, sCodEmpresaCBO As String
    Dim IdPersona, IdPersDH, IdDerechoHab As Integer
    Dim sCodParentesco, sFechaIni, sFechaFin, sCodVincFam, sCodMotivoBaja As String
    Dim dt As DataTable
    Dim oNCDerechoHab As New Nomade.NC.NCEEmpleado("Bn")

    Dim sResponse As String
    Dim resArray As Array
    Dim resb As New StringBuilder
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        sOpcion = context.Request("sOpcion")

        sCodUsuario = HttpContext.Current.User.Identity.Name
        ' sCodEmpresa = Utilities.mGetEmpresa(context)
        'sCodEstablec = Utilities.mGetEstablecimiento(context)
        IdPersona = IIf(context.Request("IdPersona") Is Nothing, 0, Convert.ToInt32(context.Request("IdPersona")))
        IdPersDH = IIf(context.Request("IdPersDH") Is Nothing, 0, Convert.ToInt32(context.Request("IdPersDH")))
        IdDerechoHab = IIf(context.Request("IdDerechoHab") Is Nothing, 0, Convert.ToInt32(context.Request("IdDerechoHab")))
        sEstado = IIf(context.Request("sEstado") Is Nothing, "", context.Request("sEstado"))
        sCodParentesco = IIf(context.Request("sCodParentesco") Is Nothing, "", context.Request("sCodParentesco"))
        sFechaIni = IIf(context.Request("sFechaIni") Is Nothing, "", context.Request("sFechaIni"))
        sFechaFin = IIf(context.Request("sFechaFin") Is Nothing, "", context.Request("sFechaFin"))
        sCodVincFam = IIf(context.Request("sCodVincFam") Is Nothing, "", context.Request("sCodVincFam"))
        sCodMotivoBaja = IIf(context.Request("sCodMotivoBaja") Is Nothing, "", context.Request("sCodMotivoBaja"))
        sIdPersSoc = IIf(sIdPersSoc Is Nothing, "", sIdPersSoc)
        nIdPersSoc = IIf(sIdPersSoc.Equals(""), 0, sIdPersSoc)
        
         Select sOpcion.ToString()    
            Case "LDH" 'Lista Derecho Habiente Empleado 
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = oNCDerechoHab.Listar_DerechoHabientes(IdPersona, IdPersDH, IIf(sEstado.Equals(""), Nothing, sEstado))
                If Not (dt Is Nothing) Then
                    sResponse = Utilities.Datatable2Json(dt)
                Else
                    sResponse = "[]"
                End If

            Case "LVXP" 'Lista Vinculo Familiar 
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim vinc As New Nomade.NC.NCVinculosFamiliares("Bn")
                dt = vinc.Listar_VinculosFam(String.Empty, String.Empty, sEstado)
                If Not (dt Is Nothing) Then
                    sResponse = Utilities.Datatable2Json(dt)
                Else
                    sResponse = "[]"
                End If

            Case "CRDH" 'Crea Derecho Habiente
                context.Response.ContentType = "application/json; charset=utf-8"
                resArray = oNCDerechoHab.Crear_DerechoHabiente(IdPersona, IdPersDH, Utilities.fechaLocal(sFechaIni), Nothing, sCodVincFam, Nothing, sEstado, sCodUsuario)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""RPTA"" :" & """" & resArray(1).ToString & """")
                resb.Append("}")
                resb.Append("]")
                sResponse = resb.ToString()

            Case "LMBXV" 'Lista Motivo de Baja por Vinculo Fam
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NCMotivosBajaDerecho As New Nomade.NC.NCMotivosBajaDerecho("Bn")
                dt = NCMotivosBajaDerecho.Listar_MotivoBaja("", "", sEstado, sCodVincFam)
                If Not (dt Is Nothing) Then
                    sResponse = Utilities.Datatable2Json(dt)
                Else
                    sResponse = "[]"
                End If
            Case "DDH" 'Desactiva Derechohabiente
                If Date.Compare(CDate(sFechaFin), CDate(sFechaIni)) > 0 Then
                    context.Response.ContentType = "text/plain"
                    sResponse = oNCDerechoHab.Desactiva_DerechoHabiente(IdDerechoHab, Utilities.fechaLocal(sFechaFin), sCodMotivoBaja, sCodUsuario)
                Else
                    sResponse = "fecha"
                End If
            Case "1" ' Lista Persona Natural menos el Socio
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim oPersona As New Nomade.NC.NCPersona("Bn")
                dt = oPersona.listar_Persona_Natural_Corto("0", String.Empty, String.Empty)
                If Not (dt Is Nothing) Then
                    For Each MiDataRow As DataRow In dt.Rows
                        If MiDataRow("PIDM").ToString = nIdPersSoc.ToString Then
                            MiDataRow.Delete()
                            Exit For
                        End If
                    Next
                    dt.AcceptChanges()
                    sResponse = Utilities.Datatable2Json(dt)
                Else
                    sResponse = "[]"
                End If
        End Select
        
        oNCDerechoHab = Nothing
        context.Response.Write(sResponse)
        
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class