Public Class NCPOS

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarPOS(ByVal P_CODE As String, ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_TIPO As String, ByVal P_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_POS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", P_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))

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

    Public Function CrearPOS(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_MARCA_MODELO As String, ByVal P_FECHA As String, ByVal P_DESCRIPCION As String, ByVal P_SERIE As String, ByVal P_TIPO As String, ByVal P_OPERADOR_PIDM As String, ByVal P_ESTADO As String, ByVal P_USUA_ID As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_POS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MARCA_MODELO", P_MARCA_MODELO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA", P_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DESCRIPCION", P_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SERIE", P_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", P_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_OPERADOR_PIDM", P_OPERADOR_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@P_CODE").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarPOS(ByVal P_CODE As String, ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_MARCA_MODELO As String, ByVal P_FECHA As String, ByVal P_DESCRIPCION As String, ByVal P_SERIE As String, ByVal P_TIPO As String, ByVal P_OPERADOR_PIDM As String, ByVal P_ESTADO As String, ByVal P_USUA_ID As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_POS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MARCA_MODELO", P_MARCA_MODELO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA", P_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DESCRIPCION", P_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SERIE", P_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", P_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_OPERADOR_PIDM", P_OPERADOR_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarMovPOS(ByVal p_mcaj_code As String, ByVal p_tipo_tarj_ind As String, ByVal p_tipo_tran_ind As String, ByVal p_mone_code As String, ByVal p_banc_code As String, ByVal p_marca_code As String, ByVal p_tipo_registro_ind As String, ByVal p_pos_code As String, Optional ByVal p_ANULADO_IND As String = "N", Optional ByVal p_TRANSFERIDO_IND As String = "N") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_MOVIMIENTO_POS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_MCAJ_CODE", p_mcaj_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_TARJ_IND", p_tipo_tarj_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_TRAN_IND", p_tipo_tran_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_mone_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BANC_CODE", p_banc_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA_CODE", p_marca_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_REGISTRO_IND", p_tipo_registro_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_POS_CODE", p_pos_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO_IND", p_ANULADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSFERIDO_IND", p_TRANSFERIDO_IND, ParameterDirection.Input, 253))
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

    Public Function CrearMovPOS(ByVal p_MCAJ_CODE As String, ByVal p_TIPO_TARJ_IND As String, _
                                ByVal p_TIPO_TRAN_IND As String, ByVal p_MONE_CODE As String, _
                                ByVal p_BANC_CODE As String, ByVal p_ULT_DIGITOS As String, _
                                ByVal p_CODIGO_AUTORIZACION As String, ByVal P_OPERADOR_PIDM As String, _
                                 ByVal p_USUA_ID As String, ByVal p_FECHA_OPERACION As String, _
                                 ByVal p_MARCA_CODE As String, ByVal p_TIPO_REGISTRO_IND As String, ByVal p_POS_CODE As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_CREAR_MOVIMIENTO_POS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_MCAJ_CODE", p_MCAJ_CODE, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_TARJ_IND", p_TIPO_TARJ_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_TRAN_IND", p_TIPO_TRAN_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BANC_CODE", p_BANC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ULT_DIGITOS", p_ULT_DIGITOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_AUTORIZACION", p_CODIGO_AUTORIZACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_OPERACION", p_FECHA_OPERACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA_CODE", p_MARCA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_REGISTRO_IND", p_TIPO_REGISTRO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_POS_CODE", p_POS_CODE, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CerrarLotePos(ByVal p_NRO As String, ByVal p_FECHA As String, _
                               ByVal p_MONTO_CIERRE As String, ByVal p_POS_COD As String, _
                               ByVal p_MONEDA_CODE As String, ByVal p_CTLG_CODE As String, _
                               ByVal p_SCSL_CODE As String, ByVal p_DETALLE As String, _
                                ByVal p_USUA_ID As String, ByVal p_TIPO_TRANSACCION As String) As String
        Try
            Dim msg As String
            Dim cmd, cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFA_CERRAR_LOTE_POS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO", p_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_CIERRE", p_MONTO_CIERRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_POS_COD", p_POS_COD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", p_MONEDA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_TRANSACCION", p_TIPO_TRANSACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_MENSAJE").Value '"OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearAjuste(
      ByVal p_ESTADO As String,
      ByVal p_MONTO As String,
      ByVal p_FECHA_INICIO As String,
      ByVal p_FECHA_FIN As String,
      ByVal p_USUA_ID As String,
      ByVal p_CTLG_CODE As String,
      ByVal p_MONE_CODE As String,
      ByVal p_OPERADOR_CODE As String,
      ByVal p_TIPO As String
     ) As String
        Try
            Dim msg As String
            Dim cmd, cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_CREAR_AJUSTE", CommandType.StoredProcedure)


            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPERADOR_CODE", p_OPERADOR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value


            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarAjuste(
          ByVal p_CODE As String,
          ByVal p_ESTADO As String,
          ByVal p_MONTO As String,
          ByVal p_FECHA_INICIO As String,
          ByVal p_FECHA_FIN As String,
          ByVal p_USUA_ID As String,
          ByVal p_CTLG_CODE As String,
          ByVal p_MONE_CODE As String,
          ByVal p_OPERADOR_CODE As String
         ) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_AJUSTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPERADOR_CODE", p_OPERADOR_CODE, ParameterDirection.Input, 253))
            cn.Ejecuta_parms(cmd)
            msg = "OK"


            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarAjuste(
      ByVal p_CODE As String,
      ByVal p_ESTADO As String,
      ByVal p_FECHA_INICIO As String,
      ByVal p_FECHA_FIN As String,
      ByVal p_CTLG_CODE As String,
      ByVal p_MONE_CODE As String,
      ByVal p_OPERADOR_CODE As String,
      Optional ByVal p_FECHA As String = Nothing
     ) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_AJUSTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPERADOR_CODE", p_OPERADOR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))

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

    Public Function ListarCierreLote(ByVal p_POS_CODE As String, ByVal p_MONE_CODE As String, Optional ByVal p_OPERADOR As String = "", _
                                     Optional ByVal p_FECHA_INICIO As String = "", Optional ByVal p_FECHA_FIN As String = "") As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_CIERRES_LOTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_POS_CODE", p_POS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPERADOR", p_OPERADOR, ParameterDirection.Input, 253))
            If p_FECHA_INICIO = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_FECHA_INICIO, ParameterDirection.Input, 253))
            End If
            If p_FECHA_INICIO = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_FECHA_FIN, ParameterDirection.Input, 253))
            End If

            Dim oDT As New DataTable
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

    Public Function ActualizarMovPOS(ByVal p_MCAJ_CODE As String, ByVal p_TIPO_TARJ_IND As String, _
                                ByVal p_TIPO_TRAN_IND As String, ByVal p_MONE_CODE As String, _
                                ByVal p_BANC_CODE As String, ByVal p_ULT_DIGITOS As String, _
                                ByVal p_CODIGO_AUTORIZACION As String, ByVal P_OPERADOR_PIDM As String, _
                                 ByVal p_USUA_ID As String, ByVal p_FECHA_OPERACION As String, _
                                 ByVal p_MARCA_CODE As String, ByVal p_TIPO_REGISTRO_IND As String, ByVal p_POS_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_ACTUALIZAR_MOVIMIENTO_POS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_MCAJ_CODE", p_MCAJ_CODE, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_TARJ_IND", p_TIPO_TARJ_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_TRAN_IND", p_TIPO_TRAN_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BANC_CODE", p_BANC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ULT_DIGITOS", p_ULT_DIGITOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_AUTORIZACION", p_CODIGO_AUTORIZACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_OPERACION", p_FECHA_OPERACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA_CODE", p_MARCA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_REGISTRO_IND", p_TIPO_REGISTRO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_POS_CODE", p_POS_CODE, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoPOS(ByVal P_CODE As String, ByVal P_USUA_ID As String) As String
        Try
            Dim estado As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_POS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            estado = cmd1.Parameters("@P_ESTADO").Value

            Return estado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function InsertarOperadorPOS(P_POST_CODE As String, P_OPTR_CODE As String, P_USUA_ID As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_INSERTAR_OPERADOR_POS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_POST_CODE", P_POST_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_OPTR_CODE", P_OPTR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@P_CODE").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function EliminarOperadorPOS(P_CODIGO As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_ELIMINAR_OPERADOR_POS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", P_CODIGO, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function AsignarPrincipalOperadorPOS(P_CODIGO As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_ASIGNAR_PRINCIPAL_OPERADOR_POS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", P_CODIGO, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function ListarOperadoresPOS(P_POST_CODE As String, P_OPERADOR_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_OPERADORES_POS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_POST_CODE", P_POST_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_OPERADOR_ESTADO", P_OPERADOR_ESTADO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
