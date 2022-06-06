Public Class CCCuotaLibre

    Private cn As Nomade.Connection

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function fnCrearCuotaLibreVtaCab(ByVal sCodRef As String, ByVal iNroCuotas As Integer, ByVal sCuotaFija As String,
                                            ByVal iPeriodoCuota As Integer, ByVal sCodUsuario As String,
                                            ByRef Optional oTransaccion As DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FAB_CREAR_CUOTA_LIBRE_VTA_CAB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", sCodRef, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUOTAS", iNroCuotas, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_CUOTA_FIJA", sCuotaFija, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO_CUOTA", iPeriodoCuota, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", sCodUsuario, ParameterDirection.Input, 253))

            If oTransaccion Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaccion.fnExecute_StoreProcedure(cmd)
            End If

            Dim sCodigo As String = cmd.Parameters("@p_CODE").Value
            Return sCodigo

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Sub fnActualizarCuotaLibreVtaCab(ByVal sCodigo As String, ByVal sCodRef As String, ByVal iNroCuotas As Integer, ByVal sCuotaFija As String,
                                            ByVal iPeriodoCuota As Integer, ByVal sCodUsuario As String,
                                            ByRef Optional oTransaccion As DataAccess.Transaccion = Nothing)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FAB_ACTUALIZAR_CUOTA_LIBRE_VTA_CAB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", sCodigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", sCodRef, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUOTAS", iNroCuotas, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_CUOTA_FIJA", sCuotaFija, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO_CUOTA", iPeriodoCuota, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", sCodUsuario, ParameterDirection.Input, 253))

            If oTransaccion Is Nothing Then
                cn.Ejecuta_parms(cmd)
            Else
                oTransaccion.fnExecute_StoreProcedure(cmd)
            End If

        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Sub fnCrearCuotaLibreVtaDet(ByVal sCodigo As String, ByVal iItem As Integer, ByVal iNroDias As Integer, ByVal sFechaVcmto As String,
                                       ByVal nMonto As Decimal, ByVal sCodUsuario As String,
                                            ByRef Optional oTransaccion As DataAccess.Transaccion = Nothing)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FAB_CREAR_CUOTA_LIBRE_VTA_DET", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", sCodigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", iItem, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_DIAS", iNroDias, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VCMT", sFechaVcmto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", nMonto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", sCodUsuario, ParameterDirection.Input, 253))

            If oTransaccion Is Nothing Then
                cn.Ejecuta_parms(cmd)
            Else
                oTransaccion.fnExecute_StoreProcedure(cmd)
            End If

        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Sub fnEliminarCuotaLibreVtaDet(ByVal sCodigo As String,
                                            ByRef Optional oTransaccion As DataAccess.Transaccion = Nothing)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FAB_ELIMINAR_CUOTA_LIBRE_VTA_DET", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", sCodigo, ParameterDirection.Input, 253))
            If oTransaccion Is Nothing Then
                cn.Ejecuta_parms(cmd)
            Else
                oTransaccion.fnExecute_StoreProcedure(cmd)
            End If

        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Function fnListarCuotaLibreVtaCab(ByVal sCodigo As String, ByVal sCodRef As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FAB_LISTA_CUOTA_LIBRE_VTA_CAB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", sCodigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", sCodRef, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_ESTADO", sEstado, ParameterDirection.Input, 253))

            Dim oDT As New DataTable()
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListarCuotaLibreVtCab(ByVal sCodigo As String, ByVal sCodRef As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FAB_LISTA_CUOTA_LIBRE_VTA_CAB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", sCodigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", sCodRef, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_ESTADO", sEstado, ParameterDirection.Input, 253))

            Dim oDT As New DataTable()
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListarCuotaLibreVtaDet(ByVal sCodigo As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FAB_LISTA_CUOTA_LIBRE_VTA_DET", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", sCodigo, ParameterDirection.Input, 253))

            Dim oDT As New DataTable()
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
