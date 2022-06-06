Public Class CPLoteDetracciones
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function CrearLotePagoDetraccion(
                                           ByVal p_NRO_SECUENCIAL As String, _
       ByVal p_FECHA_CREACION As String, _
      ByVal p_MONTO As String, _
      ByVal p_CTLG_CODE As String, _
      ByVal p_DETALLE As String, _
      ByVal p_MEDIO_PAGO As String, _
      ByVal p_USUA_ID As String, _
      ByVal p_ORIGEN As String, _
      ByVal p_DESTINO As String, _
      ByVal p_DESCRIPCION As String, _
      ByVal p_MONE_CODE As String, _
      ByVal p_APERTURA_CODE As String, _
      ByVal p_CUENTA_CODE As String, _
      ByVal p_PIDM_CUENTA As String, _
      ByVal p_ADICIONAL As String, _
      ByVal p_TIPO_PAGO_IND As String
     ) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("FVC_CREAR_LOTE_PAGO_DETRACCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_SECUENCIAL", p_NRO_SECUENCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_CREACION", p_FECHA_CREACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MEDIO_PAGO", p_MEDIO_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN", p_ORIGEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_DESTINO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_APERTURA_CODE", p_APERTURA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_CODE", p_CUENTA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_CUENTA", p_PIDM_CUENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ADICIONAL", p_ADICIONAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_PAGO_IND", p_TIPO_PAGO_IND, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd1.Parameters("@p_CODE").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CompletarPagoLoteDetraccion(
          ByVal p_MEDIO_PAGO As String, _
          ByVal p_CODE As String, _
          ByVal p_FECHA_COMPLETO As String, _
          ByVal p_USUARIO_COMPLETO As String, _
          ByVal p_ORIGEN As String, _
          ByVal p_DESTINO As String, _
          ByVal p_NRO_OPERACION As String, _
          ByVal p_DESCRIPCION As String, _
          ByVal p_APERTURA_CODE As String, _
          ByVal p_CUENTA_CODE As String, _
          ByVal p_PIDM_CUENTA As String, _
          ByVal p_ADICIONAL As String, _
          ByVal p_TIPO_PAGO_IND As String
         ) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FVC_COMPLETAR_LOTE_PAGO_DETRACCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_MEDIO_PAGO", p_MEDIO_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_COMPLETO", p_FECHA_COMPLETO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO_COMPLETO", p_USUARIO_COMPLETO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN", p_ORIGEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_DESTINO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_OPERACION", p_NRO_OPERACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_APERTURA_CODE", p_APERTURA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_CODE", p_CUENTA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_CUENTA", p_PIDM_CUENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ADICIONAL", p_ADICIONAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_PAGO_IND", p_TIPO_PAGO_IND, ParameterDirection.Input, 253))
            cn.Ejecuta_parms(cmd)
            msg = "OK"


            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function EliminarPagoLoteDetraccion(
          ByVal p_CODE As String
         ) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FVC_ELIMINAR_FVCLTDT", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cn.Ejecuta_parms(cmd)
            msg = "OK"


            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function LitsarSgteNroLoteDetraccion(
          ByVal p_CTLG_CODE As String
         ) As String
        Try
            Dim msg As String
            Dim cmd, cmd1 As IDbCommand
            cmd = cn.GetNewCommand("FVC_SGTE_NRO_SECUENCIAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO", String.Empty, ParameterDirection.Output, 253))
            cn.Ejecuta_parms(cmd)
            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_NRO").Value


            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ListarPagoLoteDetraccion(
          ByVal p_CODE As String,
          ByVal p_CTLG_CODE As String,
          ByVal p_COMPLETADO_IND As String
         ) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FVC_LISTAR_LOTE_PAGO_DETRACCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETADO_IND", p_COMPLETADO_IND, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class

